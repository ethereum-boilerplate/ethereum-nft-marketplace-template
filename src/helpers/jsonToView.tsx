import React, { useEffect, useState } from "react";

export const useJsonView = () => {

    const [ components, setComponents ] = useState<Array<React.ReactElement>>([]);
    const [ result, setResult ] = useState<Array<Array<string>>>([]);

    useEffect(() => {
        if(result.length > 0) {
            const setter = () => {
                result.forEach((pair) => {
                    setComponents(
                        prevState => [...prevState,
                        <div style={{display: "flex"}}>
                            <span children={pair[0]} />
                            <span children={pair[1]} />
                        </div>
                        ]
                    )
                })
            }
            setter()
        }

        return () => {
            setComponents([])
        }
    }, [ result ])

    const toJsonView = (json: object): void => {
        for(const [key, value] of Object.entries(json)) {
            setResult(prevState => [...prevState, [key,value]])
        }
    }

    return  {
        components,
        toJsonView
    }
}