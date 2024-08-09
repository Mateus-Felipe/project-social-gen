'use client'
import { Stage, Layer, Rect, Circle, Image, Transformer } from 'react-konva';
import Witcher from '@/images/a-witcher-in-a-river-bg.jpg'
import useImage from 'use-image';
import { useEffect, useRef, useState } from 'react';

export default function KonvaTest() {
    var isSelected = false;
    const [selectedId, setSelectedId] = useState('');
    const shapeRef = useRef();
    const trRef = useRef();

    const WitcherImage = ({ shapeProps, isSelected, onSelect,  }: any) => {
        const [image] = useImage(Witcher.src);
        return <>
            <Image
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                // {...props}
                draggable
                // onDragEnd={(e) => {
                //     onChange({
                //         ...shapeProps,
                //         x: e.target.x(),
                //         y: e.target.y(),
                //     });
                // }}
                width={450} height={450}
                onTransformEnd={(e) => {
                    // transformer is changing scale of the node
                    // and NOT its width or height
                    // but in the store we have only width and height
                    // to match the data better we will reset scale on transform end
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    // we will reset it back
                    node.scaleX(1);
                    node.scaleY(1);
                    // onChange({
                    //     ...shapeProps,
                    //     x: node.x(),
                    //     y: node.y(),
                    //     // set minimal value
                    //     width: Math.max(5, node.width() * scaleX),
                    //     height: Math.max(node.height() * scaleY),
                    // });
                }}
                image={image}
            />;
            {isSelected && (
                <Transformer
                    ref={trRef}
                    flipEnabled={false}
                    boundBoxFunc={(oldBox, newBox) => {
                        // limit resize
                        if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </>
    };

    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setSelectedId('');
        }
    };

    useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        // Stage - is a div wrapper
        // Layer - is an actual 2d canvas element, so you can have several layers inside the stage
        // Rect and Circle are not DOM elements. They are 2d shapes on canvas
        <Stage width={window.innerWidth} height={window.innerHeight} onMouseDown={checkDeselect} onTouchStart={checkDeselect}>
            <Layer>
                <Rect x={20} width={50} height={50} fill="red" />
                <Circle draggable x={200} y={200} stroke="black" radius={50} />
                <WitcherImage
                    isSelected={'bg-image' === selectedId} //ID
                    onSelect={() => {
                        setSelectedId('bg-image'); // ID
                    }}
                    // onChange={(newAttrs) => {
                    //     const rects = rectangles.slice();
                    //     rects[i] = newAttrs;
                    //     setRectangles(rects);
                    // }}
                />
            </Layer>
        </Stage>
    );
}