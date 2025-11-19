import { useState } from "react";
import AnimatedList from "../UIComp/AnimatedList";
import { useDispatch } from "react-redux";
import { setProblem } from "../store/problemSlice";

export default function ProblemList() {

    const dispatch = useDispatch();

    const items = [
        'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5',
        'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10',
    ];

    const levels = ["Easy", "Medium", "Hard"];
    const categories = ["Array",
        "LinkedList",
        "Stack",
        "Queue",
        "Strings",
        "Searching & Sorting",
        "Tree",
        "Graph",
        "HashMap",
        "Dynamic Programming"
    ];

    const [openLevel, setOpenLevel] = useState(null);
    const [openCategory, setOpenCategory] = useState({});

    const toggleLevel = (index) => {
        setOpenLevel(openLevel === index ? null : index);
    };

    const toggleCategory = (levelIndex, categoryIndex) => {
        const key = `${levelIndex}-${categoryIndex}`;
        setOpenCategory((prev) => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <div>
            <h4>Problem List</h4>

            {/* OUTER COLLAPSABLES: Easy, Medium, Hard */}
            {levels.map((level, levelIndex) => (
                <div
                    key={levelIndex}
                    style={{
                        border: "1px solid #ddd",
                        marginBottom: "10px",
                        borderRadius: "6px",
                        overflow: "hidden",
                    }}
                >
                    {/* Level Header */}
                    <div
                        onClick={() => toggleLevel(levelIndex)}
                        style={{
                            padding: "12px",
                            cursor: "pointer",
                            background: "#eaeaea",
                            display: "flex",
                            justifyContent: "space-between",
                            fontWeight: "bold",
                        }}
                    >
                        <span>{level}</span>
                        <span>{openLevel === levelIndex ? "▲" : "▼"}</span>
                    </div>

                    {/* Inner collapsables: Link List, Card List, Detailed List */}
                    {openLevel === levelIndex && (
                        <div style={{ padding: "2%", paddingTop: "6px" }}>
                            {categories.map((cat, catIndex) => {
                                const key = `${levelIndex}-${catIndex}`;
                                return (
                                    <div
                                        key={catIndex}
                                        style={{
                                            border: "1px solid #ccc",
                                            marginBottom: "8px",
                                            borderRadius: "6px",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {/* Category header */}
                                        <div
                                            onClick={() => toggleCategory(levelIndex, catIndex)}
                                            style={{
                                                padding: "10px",
                                                cursor: "pointer",
                                                background: "#f9f9f9",
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <span> {cat}</span>
                                            <span>{openCategory[key] ? "▲" : "▼"}</span>
                                        </div>

                                        {/* Animated list inside category */}
                                        {openCategory[key] && (
                                            <div >
                                                <AnimatedList
                                                    items={items}
                                                    onItemSelect={(item, i) => {
                                                        const fullValue = `${level} → ${cat} → ${item}`;
                                                        dispatch(setProblem({
                                                            ProblemName: item,
                                                            Description: fullValue,
                                                            Constraints: "1 <= n <= 10^5",
                                                            SampleInput: [
                                                                {
                                                                    "input1": "1 2 3"
                                                                },
                                                                {
                                                                    "input2": "1 2 3"
                                                                }

                                                            ],
                                                            SampleOutput: [
                                                                {
                                                                    "output1": "6"
                                                                },
                                                                {
                                                                    "output2": "6"
                                                                }
                                                            ],
                                                            TestCaseInput: [
                                                                {
                                                                    "input1": "1 2 3"
                                                                }
                                                            ],
                                                            TestCaseOutput: [
                                                                {
                                                                    "output1": "6"
                                                                }
                                                            ]
                                                        }));
                                                    }}
                                                    showGradients={false}
                                                    enableArrowNavigation={true}
                                                    displayScrollbar={true}
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
