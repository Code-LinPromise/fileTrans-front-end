import Home from "../pages/Home"
import Photo from "../pages/Photo"
import Text from "../pages/Text"
import File from "../pages/File"
import Download from "../pages/Download"
import { Navigate } from "react-router-dom"

export const router=[
    {
        path: "/",
        element:(<Navigate to="/text"/>)
    },
    {
        path:"/download",
        element: <Download />,
    },
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path:'/text',
                element: <Text />,
            },
            {
                path:'/image',
                element: <Photo />,
            },
            {
                path:'/file',
                element: <File />,
            },
        ],
    },
]