import { Tabs } from 'antd';
import Adder from "./Module/Adder";
import Overview from "./Module/Overview";

const { TabPane } = Tabs;

export default function Dashboard() {

    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Modules" key="1">
                <Overview />
            </TabPane>
            <TabPane tab="Add Module" key="2">
                <Adder />
            </TabPane>
            <TabPane tab="Panel" key="3">
                <p>Coming soon..</p>
            </TabPane>
        </Tabs>
    )
}
