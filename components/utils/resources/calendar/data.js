
export default function fixedDates(year) {

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    const data=[
        {
            month:'January',
            details:[
                {
                    date:`${year}-01-01`,
                    feast:`The Octave-Day of the Nativity of the Lord.\nCircumcision of the Lord.`,
                    saint:``,
                    color:`White`,
                },
                {
                    date:`${year}-01-02`,
                    feast:`The Most Holy Name of Jesus `,
                    saint:`St. Basil the Great, Gregory Nazianzen - Bishop, St. Marcarius`,
                    color:`White`,
                },
                {
                    date:`${year}-01-03`,
                    feast:``,
                    saint:``,
                    color:`White`,
                },
                {
                    date:`${year}-01-04`,
                    feast:``,
                    saint:``,
                    color:`White`,
                },
                {
                    date:`${year}-01-05`,
                    feast:``,
                    saint:`St. Telesphorus`,
                    color:`White`,
                },
                {
                    date:`${year}-01-06`,
                    feast:`The Epiphany of the Lord`,
                    saint:`St. Melchior, St. Baldastar***`,
                    color:`White`,
                },
                {
                    date:`${year}-01-07`,
                    feast:`The Holy Family of Jesus, Mary & Joseph`,
                    saint:`St. Lucian`,
                    color:`White`,
                },
                {
                    date:`${year}-01-08`,
                    feast:``,
                    saint:`St. Appomaris***`,
                    color:`White`,
                },
                {
                    date:`${year}-01-09`,
                    feast:``,
                    saint:`St. Julian, St. Adrian`,
                    color:`White`,
                },
                {
                    date:`${year}-01-10`,
                    feast:`Nyabinga - Anton Ooro's home - wealth brought by Baba Messiah.\nBaba Messiah the Worker`,
                    saint:`St. Nicanor, St. William`,
                    color:`Purple`,
                },
                {
                    date:`${year}-01-11`,
                    feast:``,
                    saint:``,
                    color:`White`,
                },
                {
                    date:`${year}-01-12`,
                    feast:``,
                    saint:`St. Marguerite, St. Benedict Biscop`,
                    color:`White`,
                },
                {
                    date:`${year}-01-13`,
                    feast:`The Baptism of Our Lord Jesus Christ`,
                    saint:`St. Hilary - Bishop`,
                    color:`White`,
                },
                {
                    date:`${year}-01-14`,
                    feast:``,
                    saint:`St. Malachias, St. Felix of Nola - Priest & Martyr`,
                    color:`Red`,
                },
                {
                    date:`${year}-01-15`,
                    feast:``,
                    saint:`St. Maurus - Abbot, St. Paul the Hermit - Confessor`,
                    color:`White`,
                },
                {
                    date:`${year}-01-16`,
                    feast:``,
                    saint:`St. Marcellus - Pope & Martyr`,
                    color:`Red`,
                },
                {
                    date:`${year}-01-17`,
                    feast:``,
                    saint:`St. Sulpice, St. Anthony - Abbot`,
                    color:`White`,
                },
                {
                    date:`${year}-01-18`,
                    feast:`Chair of St. Peter at Rome`,
                    saint:`St. Paul & Prisca - Virgin & Martyr`,
                    color:`White`,
                },
                {
                    date:`${year}-01-19`,
                    feast:``,
                    saint:`St. Marius, Martha, Audifax, Abachum - Martyrs, St. Canute - King & Martyr`,
                    color:`Red`,
                },
                {
                    date:`${year}-01-20`,
                    feast:``,
                    saint:`St. Fabian - Pope & St. Sabastian - Martyrs `,
                    color:`Red`,
                },
                {
                    date:`${year}-01-21`,
                    feast:``,
                    saint:`St. Agnes - Virgin & Martyr`,
                    color:`Red`,
                },
                {
                    date:`${year}-01-22`,
                    feast:``,
                    saint:`St. Vincent & Anastasius - Martyrs`,
                    color:`Red`,
                },
                {
                    date:`${year}-01-23`,
                    feast:``,
                    saint:`St. Raymond of Pennafort - confessor, St. Emerentiana - Virgin & Martyr`,
                    color:`White`,
                },
                {
                    date:`${year}-01-24`,
                    feast:``,
                    saint:`St. Timothy - Bishop & Martyr `,
                    color:`Red`,
                },
                {
                    date:`${year}-01-25`,
                    feast:`Baba Simeo's Accident, Mawego Kobuya Kendu Bay Diocese.\nThe Conversion of St. Paul, Apostle`,
                    saint:`St. Peter - Apostle`,
                    color:`Purple`,
                },
                {
                    date:`${year}-01-26`,
                    feast:``,
                    saint:`St. Paula St. Polycarp - Bishop & Martyr`,
                    color:`Red`,
                },
                {
                    date:`${year}-01-27`,
                    feast:``,
                    saint:`St. John Chrysostom - Bishop`,
                    color:`White`,
                },
                {
                    date:`${year}-01-28`,
                    feast:``,
                    saint:`St. Peter Nolasco, St. Thomas Aquinas`,
                    color:`White`,
                },
                {
                    date:`${year}-01-29`,
                    feast:``,
                    saint:`St. Francis de Sales - Bishop`,
                    color:`White`,
                },
                {
                    date:`${year}-01-30`,
                    feast:``,
                    saint:`St. Martina - Virgin & Martyr`,
                    color:`Red`,
                },
                {
                    date:`${year}-01-31`,
                    feast:``,
                    saint:`St. John Bosco - Confessor`,
                    color:`White`,
                },
            ]
        },
        {
            month:'February',
            details:[
                {
                    date:`${year}-02-01`,
                    feast:``,
                    saint:`St. Ignatius - Bishop & Martyr `,
                    color:`Red`,
                },
                {
                    date:`${year}-02-02`,
                    feast:`The Purification of the Blessed Virgin Mary`,
                    saint:``,
                    color:`White`,
                },
                {
                    date:`${year}-02-03`,
                    feast:``,
                    saint:`St. Blaise - Bishop & Martyr`,
                    color:`Red`,
                },
                {
                    date:`${year}-02-04`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-02-05`,
                    feast:``,
                    saint:`St. Agatha - Virgin & Martyr`,
                    color:`Red`,
                },
                {
                    date:`${year}-02-06`,
                    feast:``,
                    saint:`St. Titus - Bishop of Crete & Confessor, St. Dorothy - Virgin & Martyr`,
                    color:`White`,
                },
                {
                    date:`${year}-02-07`,
                    feast:``,
                    saint:`St. Romuald - Abbot`,
                    color:`White`,
                },
                {
                    date:`${year}-02-08`,
                    feast:``,
                    saint:`St. John of Matha - Confessor`,
                    color:`White`,
                },
                {
                    date:`${year}-02-09`,
                    feast:``,
                    saint:`St. Cyril, Bishop of Alexandria, St. Apollonia - Virgin & Martyr`,
                    color:`White`,
                },
                {
                    date:`${year}-02-10`,
                    feast:``,
                    saint:`St. Scholastica - Virgin `,
                    color:`White`,
                },
                {
                    date:`${year}-02-11`,
                    feast:``,
                    saint:`Our Lady of Lourdes`,
                    color:`White`,
                },
                {
                    date:`${year}-02-12`,
                    feast:``,
                    saint:`The Seven Holy Founders of the Servite Order - Confessors`,
                    color:`White`,
                },
                {
                    date:`${year}-02-13`,
                    feast:` 
                    `,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-02-14`,
                    feast:``,
                    saint:`St. Valentine - Priest & Martyr`,
                    color:`Red`,
                },
                {
                    date:`${year}-02-15`,
                    feast:``,
                    saint:`St. Faustinus & Jovita, Martyrs`,
                    color:`Red`,
                },
                {
                    date:`${year}-02-16`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-02-17`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-02-18`,
                    feast:``,
                    saint:`St. Simeon - Bishop`,
                    color:`White`,
                },
                {
                    date:`${year}-02-19`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-02-20`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-02-21`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-02-22`,
                    feast:`The Chair of St. Peter at Antioch`,
                    saint:`St. Paul, Apostle`,
                    color:`White`,
                },
                {
                    date:`${year}-02-23`,
                    feast:``,
                    saint:`St. Peter Damian - Bishop & Confessor.`,
                    color:`White`,
                },
                {
                    date:`${year}-02-24`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-02-25`,
                    feast:``,
                    saint:`St. Mathias - Apostle `,
                    color:`White`,
                },
                {
                    date:`${year}-02-26`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-02-27`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-02-28`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                
            ]
        },
        {
            month:'March',
            details:[
                {
                    date:`${year}-03-01`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-03-02`,
                    feast:`Persecution of Legion Maria, Kirindo/Jerusalem`,
                    color:`Purple`,
                },
                {
                    date:`${year}-03-03`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-03-04`,
                    feast:``,
                    saint:`St. Casimir - Confessor, St. Lucius - Pope & Martyr`,
                    color:`Red`,
                },
                {
                    date:`${year}-03-05`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-03-06`,
                    feast:``,
                    saint:`St. Perpetua & Felicity, Martyrs`,
                    color:`Red`,
                },
                {
                    date:`${year}-03-07`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-03-08`,
                    feast:``,
                    saint:`St. John of God - Confessor`,
                    color:`White`,
                },
                {
                    date:`${year}-03-09`,
                    feast:``,
                    saint:`St. Frances of Rome - Widow`,
                    color:`White`,
                },
                {
                    date:`${year}-03-10`,
                    feast:``,
                    saint:`Forty Martyrs of Sebaste`,
                    color:`Red`,
                },
                {
                    date:`${year}-03-11`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-03-12`,
                    feast:``,
                    saint:`St. Gregory - Pope`,
                    color:``,
                },
                {
                    date:`${year}-03-13`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-03-14`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-03-15`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-03-16`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-03-17`,
                    feast:``,
                    saint:`St. Patrick - Bishop`,
                    color:`White`,
                },
                {
                    date:`${year}-03-18`,
                    feast:``,
                    saint:`St. Cyril - Bishop of Jerusalem`,
                    color:`White`,
                },
                {
                    date:`${year}-03-19`,
                    feast:``,
                    saint:`St. Joseph - spouse of the Blessed Virgin Mary & Confessor `,
                    color:`White`,
                },
                {
                    date:`${year}-03-20`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-03-21`,
                    feast:``,
                    saint:`St. Benedict - Abbot`,
                    color:`White`,
                },
                {
                    date:`${year}-03-22`,
                    feast:`The Seven Sorrows of the Blessed Virgin Mary`,
                    saint:``,
                    color:`White`,
                },
                {
                    date:`${year}-03-23`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-03-24`,
                    feast:``,
                    saint:`St. Gabriel the Archangel`,
                    color:`White`,
                },
                {
                    date:`${year}-03-25`,
                    feast:`The Annunciation of the Blessed Virgin Mary (Acies)`,
                    saint:``,
                    color:`White`,
                },
                {
                    date:`${year}-03-26`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-03-27`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-03-28`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-03-29`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-03-30`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-03-31`,
                    feast:``,
                    saint:``,
                    color:``,
                },
            ]
        },
        {
            month:'April',
            details:[
                {
                    date:`${year}-04-01`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-04-02`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-04-03`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-04-04`,
                    feast:``,
                    saint:`St. Isidore - Bishop`,
                    color:`White`,
                },
                {
                    date:`${year}-04-05`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-04-06`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-04-07`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-04-08`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-04-09`,
                    feast:`Legion Maria/African Pentecost`,
                    saint:``,
                    color:`Red`,
                },
                {
                    date:`${year}-04-10`,
                    feast:``,
                    saint:``,
                    color:`Red`,
                },
                {
                    date:`${year}-04-11`,
                    feast:``,
                    saint:`St. Leo - Pope`,
                    color:`White`,
                },
                {
                    date:`${year}-04-12`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-04-13`,
                    feast:``,
                    saint:`St. Hermenegild - Martyr`,
                    color:`Red`,
                },
                {
                    date:`${year}-04-14`,
                    feast:``,
                    saint:`St. Justin - Martyr`,
                    color:``,
                },
                {
                    date:`${year}-04-15`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-04-16`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-04-17`,
                    feast:``,
                    saint:`St. Anicetus - Pope & Martyr`,
                    color:`White`,
                },
                {
                    date:`${year}-04-18`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-04-19`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-04-20`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-04-21`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-04-22`,
                    feast:``,
                    saint:`St. Soter & Cajus - Popes & Martyrs `,
                    color:`Red`,
                },
                {
                    date:`${year}-04-23`,
                    feast:``,
                    saint:`St. George - Martyr `,
                    color:`Red`,
                },
                {
                    date:`${year}-04-24`,
                    feast:``,
                    saint:`St. Fidelis of Sigmaringen - Martyr`,
                    color:`Red`,
                },
                {
                    date:`${year}-04-25`,
                    feast:``,
                    saint:`St. Mark - Evangelist, The Greater Litanies, Rogation Day. `,
                    color:`White`,
                },
                {
                    date:`${year}-04-26`,
                    feast:``,
                    saint:`St. Cletus & Marcellinus - Popes & Martyrs`,
                    color:`Red`,
                },
                {
                    date:`${year}-04-27`,
                    feast:``,
                    saint:`St. Peter Canisius - Confessor`,
                    color:`White`,
                },
                {
                    date:`${year}-04-28`,
                    feast:``,
                    saint:`St. Paul of the Cross, St. Vitalis - Martyr`,
                    color:`Red`,
                },
                {
                    date:`${year}-04-29`,
                    feast:``,
                    saint:`St. Peter - Martyr`,
                    color:`Red`,
                },
                {
                    date:`${year}-04-30`,
                    feast:``,
                    saint:`St. Catherine of Siena - Virgin,`,
                    color:`White`,
                },
                
            ]
        },

    ]

    if (isLeapYear(year)) {
        data[1].details.push({
            date: `${year}-02-29`,
            feast: ``,
            saint: ``,
            color: ``
        });
    }

    return data

}

export function fixedSundayFeasts() {

    const ashWednesdayDates=[
        '2023-02-22',
        '2024-02-14',
        '2025-03-05',
        '2026-02-18',
        '2027-02-10',
        '2028-03-01',
        '2029-02-14',
        '2030-03-06',
        '2031-02-26',
        '2032-02-11',
        '2033-03-02',
    ]

    const data1=[
        {
            feast:`1st Sunday after Epiphany.`,
            color:`White`,
        },
        {
            feast:`2nd Sunday After Epiphany.`,
            color:`Green`,
        },
        {
            feast:`3rd Sunday after Epiphany.`,
            color:`Green`,
        },
        {
            feast:`4th Sunday after Epiphany.`,
            color:`Green`,
        },
        {
            feast:`5th Sunday after Epiphany.`,
            color:`Green`,
        },
        {
            feast:`6th Sunday after Epiphany.`,
            color:`Green`,
        },
        {
            feast:`7th Sunday after Epiphany.`,
            color:`Green`,
        },
        {
            feast:`8th Sunday after Epiphany.`,
            color:`Green`,
        },
        {
            feast:`9th Sunday after Epiphany.`,
            color:`Green`,
        },
        {
            feast:`10th Sunday after Epiphany.`,
            color:`Green`,
        },
        
    ]

    const data2=[
        
        {
            feast:`Septuagesima.`,
            color:`Purple`,
        },
        {
            feast:`Sexagesima.`,
            color:`Purple`,
        },
        {
            feast:`Quinquagesima.`,
            color:`Purple`,
        },
    ]

    const data3=[
        
        {
            feast:`First Sunday of Lent.`,
            color:`Purple`,
        },
        {
            feast:`Second Sunday of Lent.`,
            color:`Purple`,
        },
        {
            feast:`Third Sunday of Lent.`,
            color:`Purple`,
        },
        {
            feast:`Fourth Sunday of Lent (Laetare).`,
            color:`Rose/White`,
        },
        {
            feast:`Passion Sunday.`,
            color:`Purple`,
        },
        {
            feast:`Palm Sunday.`,
            color:`Red/Purple`,
        },
        {
            feast:`Easter Sunday.`,
            color:`White`,
        },
    ]

    const data4=[
        
        {
            feast:`Solemn Easter Vigil and First Mass of Easter Sunday.`,
            color:`Purple`,
        },
        {
            feast:`Good Friday.`,
            color:`Black/Purple`,
        },
        {
            feast:`Holy Thursday.`,
            color:`Purple/White`,
        }
        
    ]

    return {data1, data2, data3, data4, ashWednesdayDates}

}