import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AnimatedList from "../UIComp/AnimatedList";
import { fetchProblemListStart } from "../data_store/problemList_store";
import { fetchProblemStart } from "../data_store/problem_store";
import { useRef } from "react";

export default function ProblemList() {


    const [openLevel, setOpenLevel] = useState(null);
    const [openCategory, setOpenCategory] = useState({});
    const [items, setItems] = useState([]);
    const [dynamicCategories, setDynamicCategories] = useState([]);

    const dispatch = useDispatch();
    const problemList = useSelector(state => state.problemList.data);
    const loading = useSelector(state => state.problemList.loading);

    const fetchedRef = useRef(false);

    useEffect(() => {
        if (!fetchedRef.current) {
            fetchedRef.current = true;
            dispatch(fetchProblemListStart());
        }
    }, []);


    const levels = problemList.map(item => item.difficulty);

    const toggleLevelAndListSet = (level, index) => {
        setOpenLevel(openLevel === index ? null : index);

        const selectedLevel = problemList[index];

        if (selectedLevel && selectedLevel.categories) {
            const categoriesWithPrefix = selectedLevel.categories.map(c => c.category);
            setDynamicCategories(categoriesWithPrefix);
        }

    };

    const toggleCategoryAndListSet = (level, category, levelIndex, categoryIndex) => {
        const key = `${levelIndex}-${categoryIndex}`;

        setOpenCategory(prev => {
            const updated = {};

            // Close ALL categories in this level
            Object.keys(prev).forEach(k => {
                if (k.startsWith(`${levelIndex}-`)) {
                    updated[k] = false;
                }
            });

            // Toggle only the selected category
            updated[key] = !prev[key];

            return updated;
        });

        const problems = problemList[levelIndex]?.categories[categoryIndex]?.problems || [];

        // 👉 SORT by numeric prefix
        const sorted = [...problems].sort((a, b) => {
            const numA = parseInt(a.name.split(".")[0]);  // e.g. "14" → 14
            const numB = parseInt(b.name.split(".")[0]);
            return numA - numB;
        });

        // 👉 Extract sorted problem names
        const problemNames = sorted.map(p => p.name);

        // Update items in list
        setItems(problemNames);

    };

    const setProblemStatement = (level, cat, item) => {
        console.log(`${level} → ${cat} → ${item}`);

        dispatch(fetchProblemStart({
            difficulty: level,
            category: cat,         // full category with prefix e.g. "1.Array"
            file: item + ".json"
        }));
    }

    return (
        <div>
            <h4>Problem List</h4>

            {/* OUTER COLLAPSABLES: Easy, Medium, Hard */}

            {!problemList && loading && problemList.length === 0 ?
                // If NUll or Empty
                levels.map((level, levelIndex) => (
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
                    </div>
                )) :

                // if Not null or Empty
                levels.map((level, levelIndex) => (

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
                            onClick={() => toggleLevelAndListSet(level, levelIndex)}
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
                                {dynamicCategories.map((cat, catIndex) => {
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
                                                onClick={() => toggleCategoryAndListSet(level, cat, levelIndex, catIndex)}
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
                                                            // const fullValue = `${level} → ${cat} → ${item}`;
                                                            setProblemStatement(level, cat, item);
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
