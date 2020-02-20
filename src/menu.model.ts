import {MenuNode} from './types/MenuNode';

export const menu:MenuNode[] = [
    {
        title: "A Root level",
        nodes: [
            {title: "First level 1", nodes: [
                {title: "A1 level 2"},
                {title: "A2 level 2"},
            ]},
            {title: "Third level 1"},
        ]
    },
    {
        title: "B Root level",
        nodes: [
            {title: "Second level 1"},
            {title: "Four level 1", nodes: [
                {title: "B1 level 2"},
                {title: "B2 level 2"},
                {title: "B3 level 2", nodes: [
                    {title: "B4 level 3"}
                ]},
            ]},
        ]
    },
];
