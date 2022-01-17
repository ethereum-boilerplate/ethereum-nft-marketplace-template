import { Form, Input, Button, Upload } from 'antd'
import { FileImageOutlined } from '@ant-design/icons'
import { useMoralis } from 'react-moralis'
import { useCollection } from 'components/Admin/Module/contracts/NFT/useCollection'
import { useState } from 'react'

export default function Minter(props) {
    const { web3, Moralis, account } = useMoralis()
    const { mint  } = useCollection(web3, props.address)
    const [ isSavingToIpfs, setSavingToIpfs ] = useState(false)
    const [ uploaded, setUploaded ] = useState(false)
    const [ showMinter, setToggleMinter ] = useState(false)

    const deployNft = async (params) => {
        setSavingToIpfs(true)
        const file = new Moralis.File(params.name, params.image.file)
        await file.saveIPFS()
        const metadata = {
            "name": params.name,
            "description": params.desc,
            "image": `ipfs://${file.hash()}`,
        }
        const json = new Moralis.File("metadata.json", {base64: btoa(JSON.stringify(metadata))})
        await json.saveIPFS()
        await mint(account, `ipfs://${json.hash()}`, account)
        setSavingToIpfs(false)
    }

    return (
        <div>
            { !showMinter && <Button  style={{width: '100%'}} onClick={() => setToggleMinter(!showMinter)}>{showMinter ? "Back" : "Mint NFT"}</Button>}
            { showMinter && <Form layout="vertical" style={{width: '100%', margin: '0 auto'}} onFinish={(e) => deployNft(e)}>
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Give your NFT a name' }]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item  label="Upload Image" name="image" rules={[{ required: true, message: 'Upload an Image' }]}>
                        <Upload 
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action={() => ""}
                        beforeUpload={ () => { 
                            setUploaded(true)
                            return false 
                        }}
                        onChange={() => {}} type="drag"
                        disabled={uploaded ? true : false}
                        >
                            { !uploaded && <><FileImageOutlined />
                                <p className="ant-upload-text">Click or drag image to upload</p>
                                <p className="ant-upload-hint" style={{fontSize: '10px'}}>Recommendation: minimum of 350px by 350px</p>
                            </>
                            }
                            {
                                uploaded && <p>Uploaded!</p>
                            }
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Description" name="desc">
                        <Input/>
                    </Form.Item>
                    {   /* TODO :
                            - ADD Properties options
                            - ADD Advanced Metadata
                        */
                    }
                    <Form.Item>
                        <Button style={{width: '100%'}} htmlType="submit" loading={isSavingToIpfs}>
                        Mint NFT
                        </Button>
                    </Form.Item>
                </Form>}
        </div>
    )
}
