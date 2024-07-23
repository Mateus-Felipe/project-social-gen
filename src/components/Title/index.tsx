import { ReactNode, useEffect } from "react";

interface TitleProps {
    children: ReactNode,
    style?: string,
    color?: 'white' | 'black'
}

export default function Title({ children, style, color }: TitleProps) {

    return (
        <div>
            <h1
                className={` font-bold text-2xl ${style} `}
            > {children} </h1>
        </div>
    );
}