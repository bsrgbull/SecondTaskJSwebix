webix.ui({
    rows:[
        { type:"header", template:"Задание№2" },
        { cols:[
            { rows:[
                { type:"header", template:"Склад" },
                { id: "table1", view:"datatable", autowidth:true,
                    columns:[
                        { id:"name", header:"Товар", sort:"string"},
                        { id:"quantity", header:"Количество", sort:"int"},
                        { id:"price", header:"Цена", sort:"int"},
                        { id:"addButton", header:"", maxWidth: 40},
                        { id:"delButton", header:"", maxWidth: 40}
                    ],
                },
            ]},
            { rows:[
                { type:"header", template:"Корзина" },
                { id: "table2", view:"datatable", autowidth:true,
                    columns:[
                        { id:"name", header:"Товар", sort:"string"},
                        { id:"quantity", header:"Количество", sort:"int"},
                        { id:"price", header:"Цена", sort:"int"},
                        { id:"addButton", header:"", maxWidth: 40},
                        { id:"delButton", header:"", maxWidth: 40}
                    ],
                },
                { id: "summIndicator", type:"header", template:"Сумма:" },
            ]},
        ]},
    ]
});