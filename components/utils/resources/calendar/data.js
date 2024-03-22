'use client'

import { getCalendar } from "@/app/api/v14/controllers/hq/route";

export default function fixedDates(year) {

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    const data=[
        {
            month:'January - The Holy Name of Jesus',
            details:[
                {
                    date:`${year}-01-01`,
                    feast:`The Octave-Day of the Nativity of the Lord.\nCircumcision of the Lord.`,
                    saint:``,
                    color:`White`,
                },
                {
                    date:`${year}-01-02`,
                    feast:``,
                    saint:`St. Basil the Great. St. Gregory Nazianzen - Bishop. St. Marcarius`,
                    color:`White`,
                },
                {
                    date:`${year}-01-03`,
                    feast:`The Most Holy Name of Jesus`,
                    saint:`St. Genevieve`,
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
                    saint:`St. Telesphorus. St. John Neumann`,
                    color:`White`,
                },
                {
                    date:`${year}-01-06`,
                    feast:`The Epiphany of the Lord`,
                    saint:`St. Melchior. St. Baldastar***. St. Gaspar`,
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
                    saint:`St. Julian. St. Adrian.`,
                    color:`White`,
                },
                {
                    date:`${year}-01-10`,
                    feast:`Nyabinga - Anton Ooro's home - wealth brought by Baba Messiah.\nBaba Messiah the Worker`,
                    saint:`St. Nicanor. St. William`,
                    color:`Purple`,
                },
                {
                    date:`${year}-01-11`,
                    feast:``,
                    saint:`St. Hyginus`,
                    color:`White`,
                },
                {
                    date:`${year}-01-12`,
                    feast:``,
                    saint:`St. Marguerite. St. Benedict Biscop`,
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
                    saint:`St. Malachias. St. Felix of Nola - Priest & Martyr. St. Hilary`,
                    color:`Red`,
                },
                {
                    date:`${year}-01-15`,
                    feast:``,
                    saint:`St. Maurus - Abbot. St. Paul the Hermit - Confessor`,
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
                    saint:`St. Sulpice. St. Anthony - Abbot`,
                    color:`White`,
                },
                {
                    date:`${year}-01-18`,
                    feast:`Chair of St. Peter at Rome`,
                    saint:`Sts. Paul & Prisca - Virgin & Martyr`,
                    color:`White`,
                },
                {
                    date:`${year}-01-19`,
                    feast:``,
                    saint:`Sts. Marius, Martha, Audifax, Abachum - Martyrs. St. Canute - King & Martyr`,
                    color:`Red`,
                },
                {
                    date:`${year}-01-20`,
                    feast:``,
                    saint:`St. Fabian - Pope. St. Sabastian - Martyr `,
                    color:`White`,
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
                    saint:`Sts. Vincent & Anastasius - Martyrs`,
                    color:`Red`,
                },
                {
                    date:`${year}-01-23`,
                    feast:``,
                    saint:`St. Raymond of Pennafort - confessor. St. Emerentiana - Virgin & Martyr`,
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
                    saint:`St. Paula. St. Polycarp - Bishop & Martyr`,
                    color:`White`,
                },
                {
                    date:`${year}-01-27`,
                    feast:``,
                    saint:`St. John Chrysostom - Bishop. St. John Chrysostom`,
                    color:`White`,
                },
                {
                    date:`${year}-01-28`,
                    feast:``,
                    saint:`St. Peter Nolasco. St. Thomas Aquinas`,
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
                    saint:`St. John Bosco - Confessor. St. John Bosco.`,
                    color:`White`,
                },
            ]
        },
        {
            month:'February - The Holy Family',
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
                    saint:`St. Titus - Bishop of Crete & Confessor. St. Dorothy - Virgin & Martyr`,
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
                    saint:`St. Cyril - Bishop of Alexandria. St. Apollonia - Virgin & Martyr`,
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
                    feast:``,
                    saint:`St. Agabus`,
                    color:`White`,
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
                    saint:`Sts. Faustinus & Jovita, Martyrs`,
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
                    saint:`St. Gabinus`,
                    color:`White`,
                },
                {
                    date:`${year}-02-20`,
                    feast:``,
                    saint:`St. Amata`,
                    color:`White`,
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
                    saint:`St. Paul - Apostle`,
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
                    saint:`St. Alexander`,
                    color:`White`,
                },
                {
                    date:`${year}-02-27`,
                    feast:``,
                    saint:`St. Gabriel`,
                    color:`White`,
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
            month:'March - St. Joseph',
            details:[
                {
                    date:`${year}-03-01`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-03-02`,
                    feast:`Persecution of Legion Maria - Kirindo/Jerusalem`,
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
                    saint:`St. Casimir - Confessor, St. Lucius - Pope & Martyr, St. Francis of Assisi`,
                    color:`White`,
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
                    color:`White`,
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
                    saint:`St. Abraham`,
                    color:`White`,
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
                    saint:`St. Joseph - Spouse of the Blessed Virgin Mary & Confessor `,
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
                    saint:`St. Acacius`,
                    color:`White`,
                },
            ]
        },
        {
            month:'April - The Blessed Sacrament',
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
                    saint:`St. Mary`,
                    color:`White`,
                },
                {
                    date:`${year}-04-03`,
                    feast:``,
                    saint:`St. Richard`,
                    color:`White`,
                },
                {
                    date:`${year}-04-04`,
                    feast:``,
                    saint:`St. Isidore - Bishop, St. Benedict`,
                    color:`White`,
                },
                {
                    date:`${year}-04-05`,
                    feast:``,
                    saint:`St. Vincent Ferrer`,
                    color:`White`,
                },
                {
                    date:`${year}-04-06`,
                    feast:``,
                    saint:`St. Juliana`,
                    color:`White`,
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
                    saint:`St. Julie Billiart`,
                    color:`White`,
                },
                {
                    date:`${year}-04-09`,
                    feast:`Legion Maria/African Pentecost`,
                    saint:`St. Mary of Cleophas`,
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
                    saint:`St. Leo the Great - Pope`,
                    color:`White`,
                },
                {
                    date:`${year}-04-12`,
                    feast:``,
                    saint:`St. Sabbas`,
                    color:`White`,
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
                    saint:`St. Justin - Martyr, St. Velerian, St. Tiburtius, St. Maximus`,
                    color:`Red`,
                },
                {
                    date:`${year}-04-15`,
                    feast:``,
                    saint:`St. Anastasia. St. Basilissa****`,
                    color:`White`,
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
                    saint:`St. Apedle****`,
                    color:`White`,
                },
                {
                    date:`${year}-04-19`,
                    feast:``,
                    saint:`St. Leo IX`,
                    color:`White`,
                },
                {
                    date:`${year}-04-20`,
                    feast:``,
                    saint:`St. Marcellinus`,
                    color:`White`,
                },
                {
                    date:`${year}-04-21`,
                    feast:``,
                    saint:`St. Anselm`,
                    color:`White`,
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
                    feast:`The Greater Litanies.\nRogation Day`,
                    saint:`St. Mark - Evangelist. `,
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
                    saint:`St. Peter Canisius - Confessor, St. Zita`,
                    color:`White`,
                },
                {
                    date:`${year}-04-28`,
                    feast:``,
                    saint:`St. Paul of the Cross, St. Vitalis - Martyr, St. Louis Marie de Montfort.`,
                    color:`Red`,
                },
                {
                    date:`${year}-04-29`,
                    feast:``,
                    saint:`St. Peter Verona - Martyr.`,
                    color:`Red`,
                },
                {
                    date:`${year}-04-30`,
                    feast:``,
                    saint:`St. Catherine of Siena - Virgin.`,
                    color:`White`,
                },
                
            ]
        },
        {
            month:'May - The Blessed Virgin Mary',
            details:[
                {
                    date:`${year}-05-01`,
                    feast:``,
                    saint:`St. Joseph the Worker - Spouse of the Blessed Virgin Mary & Confessor. St. Peregrine`,
                    color:`White`,
                },
                {
                    date:`${year}-05-02`,
                    feast:``,
                    saint:`St. Athanasius - Bishop`,
                    color:`White`,
                },
                {
                    date:`${year}-05-03`,
                    feast:``,
                    saint:`Sts. Philip & James - Apostles. Sts. Alexander, Eventius & Theodulus - Martyrs, Juvenal & Bishop. St. Timothy & Maura.`,
                    color:`Red`,
                },
                {
                    date:`${year}-05-04`,
                    feast:``,
                    saint:`St. Monica.`,
                    color:`White`,
                },
                {
                    date:`${year}-05-05`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-05-06`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-05-07`,
                    feast:``,
                    saint:`St. Stanislaus.`,
                    color:`White`,
                },
                {
                    date:`${year}-05-08`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-05-09`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-05-10`,
                    feast:``,
                    saint:`St. Antonius.`,
                    color:`White`,
                },
                {
                    date:`${year}-05-11`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-05-12`,
                    feast:``,
                    saint:`St. Achilles. St. Nereus. St. Pancratius.`,
                    color:`White`,
                },
                {
                    date:`${year}-05-13`,
                    feast:``,
                    saint:`St. Robert Bellarmine.`,
                    color:`White`,
                },
                {
                    date:`${year}-05-14`,
                    feast:``,
                    saint:`St. Boniface. St. Matthias.`,
                    color:`White`,
                },
                {
                    date:`${year}-05-15`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-05-16`,
                    feast:``,
                    saint:`St. Brendan. St. Simon Stock. St. Ubaldus.`,
                    color:`White`,
                },
                {
                    date:`${year}-05-17`,
                    feast:``,
                    saint:`St. Paschal Baylon. St. Patrick.`,
                    color:`White`,
                },
                {
                    date:`${year}-05-18`,
                    feast:``,
                    saint:`St. Venantius.`,
                    color:`White`,
                },
                {
                    date:`${year}-05-19`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-05-20`,
                    feast:``,
                    saint:`St. Bernardine.`,
                    color:`White`,
                },
                {
                    date:`${year}-05-21`,
                    feast:``,
                    saint:`St. Andrew Bobola.`,
                    color:`White`,
                },
                {
                    date:`${year}-05-22`,
                    feast:``,
                    saint:`St. Rita.`,
                    color:`White`,
                },
                {
                    date:`${year}-05-23`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-05-24`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-05-25`,
                    feast:``,
                    saint:`St. Madeleine Sophie.`,
                    color:`White`,
                },
                {
                    date:`${year}-05-26`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-05-27`,
                    feast:``,
                    saint:`St. Bede - Venerable.`,
                    color:`White`,
                },
                {
                    date:`${year}-05-28`,
                    feast:``,
                    saint:`St. Augustine.`,
                    color:`White`,
                },
                {
                    date:`${year}-05-29`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-05-30`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-05-31`,
                    feast:`Feast of the Visitation`,
                    saint:``,
                    color:`White`,
                },
                
            ]
        },
        {
            month:'June - The Sacred Heart of Jesus',
            details:[
                {
                    date:`${year}-06-01`,
                    feast:``,
                    saint:`St. Angela Menci`,
                    color:`White`,
                },
                {
                    date:`${year}-06-02`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-06-03`,
                    feast:``,
                    saint:`St. Kevin`,
                    color:`White`,
                },
                {
                    date:`${year}-06-04`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-06-05`,
                    feast:``,
                    saint:`St. Boniface - Martyr`,
                    color:`Red`,
                },
                {
                    date:`${year}-06-06`,
                    feast:``,
                    saint:`St. Philip - Deacon. St. Norbert`,
                    color:`White`,
                },
                {
                    date:`${year}-06-07`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-06-08`,
                    feast:``,
                    saint:`St. Modard`,
                    color:`White`,
                },
                {
                    date:`${year}-06-09`,
                    feast:``,
                    saint:`St. Primus`,
                    color:`White`,
                },
                {
                    date:`${year}-06-10`,
                    feast:``,
                    saint:`St. Margaret`,
                    color:`White`,
                },
                {
                    date:`${year}-06-11`,
                    feast:``,
                    saint:`St. Barnabas - Apostle`,
                    color:`White`,
                },
                {
                    date:`${year}-06-12`,
                    feast:``,
                    saint:`St. Onuphrius. St. Nabor & Nazarius. St. Basilides`,
                    color:`White`,
                },
                {
                    date:`${year}-06-13`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-06-14`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-06-15`,
                    feast:``,
                    saint:`St. Vitus, Modestus & Crescentia - Matyrs`,
                    color:`Red`,
                },
                {
                    date:`${year}-06-16`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-06-17`,
                    feast:``,
                    saint:`St. Ranier. St. Botolph`,
                    color:`White`,
                },
                {
                    date:`${year}-06-18`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-06-19`,
                    feast:``,
                    saint:`St. Juliana Falconieri`,
                    color:`White`,
                },
                {
                    date:`${year}-06-20`,
                    feast:``,
                    saint:`St. Silverius`,
                    color:`White`,
                },
                {
                    date:`${year}-06-21`,
                    feast:``,
                    saint:`St. Terence. St. Aloysius Gonzaga`,
                    color:`White`,
                },
                {
                    date:`${year}-06-22`,
                    feast:``,
                    saint:`St. Paulinus`,
                    color:`White`,
                },
                {
                    date:`${year}-06-23`,
                    feast:``,
                    saint:`St. Audrey`,
                    color:`White`,
                },
                {
                    date:`${year}-06-24`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-06-25`,
                    feast:``,
                    saint:`St. William`,
                    color:`White`,
                },
                {
                    date:`${year}-06-26`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-06-27`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-06-28`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-06-29`,
                    feast:``,
                    saint:`St. Peter & Paul`,
                    color:`White`,
                },
                {
                    date:`${year}-06-30`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                
                
            ]
        },
        {
            month:'July - The Precious Blood',
            details:[
                {
                    date:`${year}-07-01`,
                    feast:`Feast of the Most Precious Blood`,
                    saint:`St. Junipero Serra`,
                    color:`White`,
                },
                {
                    date:`${year}-07-02`,
                    feast:``,
                    saint:`St. Processus & Martinian - Martyrs`,
                    color:`Red`,
                },
                {
                    date:`${year}-07-03`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-07-04`,
                    feast:``,
                    saint:`St. Theodore`,
                    color:`White`,
                },
                {
                    date:`${year}-07-05`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-07-06`,
                    feast:``,
                    saint:`St. Thomas More`,
                    color:`White`,
                },
                {
                    date:`${year}-07-07`,
                    feast:``,
                    saint:`St. Methodius`,
                    color:`White`,
                },
                {
                    date:`${year}-07-08`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-07-09`,
                    feast:``,
                    saint:`St. Maria Goretti`,
                    color:`White`,
                },
                {
                    date:`${year}-07-10`,
                    feast:``,
                    saint:`St. Rufina & Secunda`,
                    color:`White`,
                },
                {
                    date:`${year}-07-11`,
                    feast:``,
                    saint:`St. Oliver. St. Pius I - Martyr`,
                    color:`Red`,
                },
                {
                    date:`${year}-07-12`,
                    feast:``,
                    saint:`St. Veronica`,
                    color:`White`,
                },
                {
                    date:`${year}-07-13`,
                    feast:``,
                    saint:`St. Anacletus - Martyr. St. Mildred. St. Teresa`,
                    color:`Red`,
                },
                {
                    date:`${year}-07-14`,
                    feast:``,
                    saint:`St. Bonaventure`,
                    color:`White`,
                },
                {
                    date:`${year}-07-15`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-07-16`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-07-17`,
                    feast:``,
                    saint:`St. Alexis the Beggar`,
                    color:`White`,
                },
                {
                    date:`${year}-07-18`,
                    feast:``,
                    saint:`St. Carnillus de Lellis`,
                    color:`White`,
                },
                {
                    date:`${year}-07-19`,
                    feast:``,
                    saint:`St. Vincent de Paul`,
                    color:`White`,
                },
                {
                    date:`${year}-07-20`,
                    feast:``,
                    saint:`St. Margaret of Antioch`,
                    color:`White`,
                },
                {
                    date:`${year}-07-21`,
                    feast:``,
                    saint:`St. Laurence. St. Pra****`,
                    color:`White`,
                },
                {
                    date:`${year}-07-22`,
                    feast:``,
                    saint:`St. Mary Magdalen`,
                    color:`White`,
                },
                {
                    date:`${year}-07-23`,
                    feast:``,
                    saint:`St. Liborius - Martyr`,
                    color:`Red`,
                },
                {
                    date:`${year}-07-24`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-07-25`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-07-26`,
                    feast:``,
                    saint:`St. Anne`,
                    color:`White`,
                },
                {
                    date:`${year}-07-27`,
                    feast:``,
                    saint:`St. Panteleon`,
                    color:`White`,
                },
                {
                    date:`${year}-07-28`,
                    feast:``,
                    saint:`St. Nazarius & Celsus. St. Victor I & Innocent I. St. Samson of Dol`,
                    color:`White`,
                },
                {
                    date:`${year}-07-29`,
                    feast:``,
                    saint:`St. Beatrice. St. Simplicius`,
                    color:`White`,
                },
                {
                    date:`${year}-07-30`,
                    feast:``,
                    saint:`Sts. Abdon & Sennen. St. Justin de Jacobis. St. Peter Chrysologus`,
                    color:`White`,
                },
                {
                    date:`${year}-07-31`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                
            ]
        },
        {
            month:'August - The Immaculate Heart of Mary',
            details:[
                {
                    date:`${year}-08-01`,
                    feast:``,
                    saint:`St. Samona`,
                    color:`White`,
                },
                {
                    date:`${year}-08-02`,
                    feast:``,
                    saint:`St. Alphonsus Liguori.`,
                    color:`White`,
                },
                {
                    date:`${year}-08-03`,
                    feast:``,
                    saint:`St. Peter Julian Eymard. St. Lydia`,
                    color:`White`,
                },
                {
                    date:`${year}-08-04`,
                    feast:``,
                    saint:`St. Bartholomew`,
                    color:`White`,
                },
                {
                    date:`${year}-08-05`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-08-06`,
                    feast:``,
                    saint:`St. Xystus. St. Felicissimus. St. Agapitus.`,
                    color:`White`,
                },
                {
                    date:`${year}-08-07`,
                    feast:``,
                    saint:`St. Cajetan`,
                    color:`White`,
                },
                {
                    date:`${year}-08-08`,
                    feast:``,
                    saint:`St. Smaragdus. St. Largus`,
                    color:`White`,
                },
                {
                    date:`${year}-08-09`,
                    feast:``,
                    saint:`St. Romanus - Martyr`,
                    color:`Red`,
                },
                {
                    date:`${year}-08-10`,
                    feast:``,
                    saint:`St. Lawrence - Martyr`,
                    color:`Red`,
                },
                {
                    date:`${year}-08-11`,
                    feast:``,
                    saint:`St. Philomena. St. Tiburtius. St. Susana`,
                    color:`White`,
                },
                {
                    date:`${year}-08-12`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-08-13`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-08-14`,
                    feast:``,
                    saint:`St. Maxmillian Kolbe`,
                    color:`White`,
                },
                {
                    date:`${year}-08-15`,
                    feast:`Solemnity of the Assumption of the Blessed Virgin Mary`,
                    saint:`St. Tarsicius`,
                    color:`White`,
                },
                {
                    date:`${year}-08-16`,
                    feast:``,
                    saint:`St. Rocco`,
                    color:`White`,
                },
                {
                    date:`${year}-08-17`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-08-18`,
                    feast:``,
                    saint:`St. Victoria Rosoamanarivo`,
                    color:`White`,
                },
                {
                    date:`${year}-08-19`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-08-20`,
                    feast:``,
                    saint:`St. Bernard`,
                    color:`White`,
                },
                {
                    date:`${year}-08-21`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-08-22`,
                    feast:`Feast of the Queenship of Mary`,
                    saint:`St. Timothy. St. Hippollytus. St. Symphorian`,
                    color:`White`,
                },
                {
                    date:`${year}-08-23`,
                    feast:``,
                    saint:`St. Philip Benizi`,
                    color:`White`,
                },
                {
                    date:`${year}-08-24`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-08-25`,
                    feast:``,
                    saint:`St. Patricia. St. Louis - King of France`,
                    color:`White`,
                },
                {
                    date:`${year}-08-26`,
                    feast:``,
                    saint:`St. Zephyrinus`,
                    color:`White`,
                },
                {
                    date:`${year}-08-27`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-08-28`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-08-29`,
                    feast:``,
                    saint:`St. Sabina`,
                    color:`White`,
                },
                {
                    date:`${year}-08-30`,
                    feast:``,
                    saint:`St. Rose of Lima. St. Adauctus`,
                    color:`White`,
                },
                {
                    date:`${year}-08-31`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                
            ]
        },
        {
            month:'September - The Seven Sorrows of Mary',
            details:[
                {
                    date:`${year}-09-01`,
                    feast:``,
                    saint:`St. Aegidius. St. Anna - Prophetess.`,
                    color:`White`,
                },
                {
                    date:`${year}-09-02`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-09-03`,
                    feast:``,
                    saint:`St. Pius X`,
                    color:`White`,
                },
                {
                    date:`${year}-09-04`,
                    feast:``,
                    saint:`St. Rosalia. St. Rose`,
                    color:`White`,
                },
                {
                    date:`${year}-09-05`,
                    feast:``,
                    saint:`St. Lawrence Justinian`,
                    color:`White`,
                },
                {
                    date:`${year}-09-06`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-09-07`,
                    feast:``,
                    saint:`St. Regina`,
                    color:`White`,
                },
                {
                    date:`${year}-09-08`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-09-09`,
                    feast:``,
                    saint:`St. Peter Claver`,
                    color:`White`,
                },
                {
                    date:`${year}-09-10`,
                    feast:``,
                    saint:`St. Nicholas`,
                    color:`White`,
                },
                {
                    date:`${year}-09-11`,
                    feast:``,
                    saint:`St. Paphnutius`,
                    color:`White`,
                },
                {
                    date:`${year}-09-12`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-09-13`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-09-14`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-09-15`,
                    feast:`The feast of Our Lady of Sorrows`,
                    saint:`St. Nicomedes`,
                    color:`White`,
                },
                {
                    date:`${year}-09-16`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-09-17`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-09-18`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-09-19`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-09-20`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-09-21`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-09-22`,
                    feast:``,
                    saint:`St. Maurice & the Theban Legion - Martyrs`,
                    color:`Red`,
                },
                {
                    date:`${year}-09-23`,
                    feast:``,
                    saint:`St. Linus - Martyr. St. Padre Pio. St. Thecla`,
                    color:`Red`,
                },
                {
                    date:`${year}-09-24`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-09-25`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-09-26`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-09-27`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-09-28`,
                    feast:``,
                    saint:`St. Wenceslaus - Martyr****`,
                    color:`Red`,
                },
                {
                    date:`${year}-09-29`,
                    feast:``,
                    saint:`St. Michael - Archangel`,
                    color:``,
                },
                {
                    date:`${year}-09-30`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                
                
            ]
        },
        {
            month:'October - The Holy Rosary',
            details:[
                {
                    date:`${year}-10-01`,
                    feast:``,
                    saint:`St. Remegius`,
                    color:`White`,
                },
                {
                    date:`${year}-10-02`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-10-03`,
                    feast:``,
                    saint:`St. Therese of Lisieux.`,
                    color:`White`,
                },
                {
                    date:`${year}-10-04`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-10-05`,
                    feast:``,
                    saint:`St. Plaridus***`,
                    color:`White`,
                },
                {
                    date:`${year}-10-06`,
                    feast:``,
                    saint:`St. Bruno`,
                    color:`White`,
                },
                {
                    date:`${year}-10-07`,
                    feast:`Feast of Our Lady of the Rosary`,
                    saint:`St. Mark. Sts. B***, Marcellus & Apoleius - Martyrs`,
                    color:`Red`,
                },
                {
                    date:`${year}-10-08`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-10-09`,
                    feast:``,
                    saint:`Sts. Sergius, Rusticus & Eleutherius - Martyrs.`,
                    color:`Red`,
                },
                {
                    date:`${year}-10-10`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-10-11`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-10-12`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-10-13`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-10-14`,
                    feast:``,
                    saint:`St. Callistus - Martyr.`,
                    color:`Red`,
                },
                {
                    date:`${year}-10-15`,
                    feast:``,
                    saint:`St. Teresa of Avila`,
                    color:`White`,
                },
                {
                    date:`${year}-10-16`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-10-17`,
                    feast:``,
                    saint:`St. Margaret Mary Alacoque`,
                    color:`White`,
                },
                {
                    date:`${year}-10-18`,
                    feast:``,
                    saint:`St. Luke - Evangelist`,
                    color:`White`,
                },
                {
                    date:`${year}-10-19`,
                    feast:``,
                    saint:`St. Peter of Alcantara`,
                    color:`White`,
                },
                {
                    date:`${year}-10-20`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-10-21`,
                    feast:``,
                    saint:`St. Ursula`,
                    color:`White`,
                },
                {
                    date:`${year}-10-22`,
                    feast:``,
                    saint:`St. Mary Salome`,
                    color:`White`,
                },
                {
                    date:`${year}-10-23`,
                    feast:``,
                    saint:`St. Anthony Mary Claret`,
                    color:`White`,
                },
                {
                    date:`${year}-10-24`,
                    feast:``,
                    saint:`St. Raphael - Archangel`,
                    color:``,
                },
                {
                    date:`${year}-10-25`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-10-26`,
                    feast:``,
                    saint:`St. Alfred`,
                    color:`White`,
                },
                {
                    date:`${year}-10-27`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-10-28`,
                    feast:``,
                    saint:`Sts. Simon & Jude`,
                    color:`White`,
                },
                {
                    date:`${year}-10-29`,
                    feast:``,
                    saint:`St. Narcissus`,
                    color:`White`,
                },
                {
                    date:`${year}-10-30`,
                    feast:``,
                    saint:`St. Alphonsus Rodriguez`,
                    color:`White`,
                },
                {
                    date:`${year}-10-31`,
                    feast:``,
                    saint:`St. Wolfgang`,
                    color:`White`,
                },
                
            ]
        },
        {
            month:'November - The Holy Souls in Purgatory',
            details:[
                {
                    date:`${year}-11-01`,
                    feast:`All Saints`,
                    saint:`St. Deborah, Rachel & Ruth`,
                    color:`White`,
                },
                {
                    date:`${year}-11-02`,
                    feast:`Commemoration of All Souls`,
                    saint:``,
                    color:`Black`,
                },
                {
                    date:`${year}-11-03`,
                    feast:``,
                    saint:`St. Martin de Porres. St. Malachy`,
                    color:`White`,
                },
                {
                    date:`${year}-11-04`,
                    feast:``,
                    saint:`St. Vitalis. St. Agricola`,
                    color:`White`,
                },
                {
                    date:`${year}-11-05`,
                    feast:``,
                    saint:`Sts. Zachary & Elizabeth`,
                    color:`White`,
                },
                {
                    date:`${year}-11-06`,
                    feast:``,
                    saint:`St. Leonard of Limoges. St. Leonard Reresby`,
                    color:`White`,
                },
                {
                    date:`${year}-11-07`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-11-08`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-11-09`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-11-10`,
                    feast:``,
                    saint:`Sts. Tryphon, Respicius & Nympha - Martyrs. St. Andrew Avellino`,
                    color:`Red`,
                },
                {
                    date:`${year}-11-11`,
                    feast:``,
                    saint:`St. Mennas - Martyr`,
                    color:`Red`,
                },
                {
                    date:`${year}-11-12`,
                    feast:``,
                    saint:`St. Martin - Martyr`,
                    color:`Red`,
                },
                {
                    date:`${year}-11-13`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-11-14`,
                    feast:``,
                    saint:`St. Laurence O'Toole`,
                    color:`White`,
                },
                {
                    date:`${year}-11-15`,
                    feast:``,
                    saint:`St. Albert the Great`,
                    color:`White`,
                },
                {
                    date:`${year}-11-16`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-11-17`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-11-18`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-11-19`,
                    feast:``,
                    saint:`St. Pondanus***`,
                    color:`White`,
                },
                {
                    date:`${year}-11-20`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-11-21`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-11-22`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-11-23`,
                    feast:``,
                    saint:`St. Miguel Pro`,
                    color:`White`,
                },
                {
                    date:`${year}-11-24`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-11-25`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-11-26`,
                    feast:``,
                    saint:`St. Peter of Alexandria. St. Leonard`,
                    color:`White`,
                },
                {
                    date:`${year}-11-27`,
                    feast:``,
                    saint:`St. Leonard Kimura`,
                    color:`White`,
                },
                {
                    date:`${year}-11-28`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-11-29`,
                    feast:``,
                    saint:`St. Saturninus`,
                    color:`White`,
                },
                {
                    date:`${year}-11-30`,
                    feast:``,
                    saint:`St. Maura. St. Andrew - Apostle`,
                    color:`White`,
                },
                
                
            ]
        },
        {
            month:'December - The Immaculate Conception',
            details:[
                {
                    date:`${year}-12-01`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-12-02`,
                    feast:``,
                    saint:`St. Bibiana [Vivian]`,
                    color:`White`,
                },
                {
                    date:`${year}-12-03`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-12-04`,
                    feast:``,
                    saint:`St. Barbara - Martyr`,
                    color:`Red`,
                },
                {
                    date:`${year}-12-05`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-12-06`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-12-07`,
                    feast:``,
                    saint:`St. Ambrose`,
                    color:`White`,
                },
                {
                    date:`${year}-12-08`,
                    feast:`The Solemnity of the Immaculate Conception`,
                    saint:``,
                    color:`White`,
                },
                {
                    date:`${year}-12-09`,
                    feast:``,
                    saint:`St. Juan Diego. St. Leocadia`,
                    color:`White`,
                },
                {
                    date:`${year}-12-10`,
                    feast:``,
                    saint:`St. Melchiades - Martyr`,
                    color:`Red`,
                },
                {
                    date:`${year}-12-11`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-12-12`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-12-13`,
                    feast:``,
                    saint:`St. Lucy - Martyr`,
                    color:`Red`,
                },
                {
                    date:`${year}-12-14`,
                    feast:``,
                    saint:`St. Nicasius`,
                    color:`White`,
                },
                {
                    date:`${year}-12-15`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-12-16`,
                    feast:``,
                    saint:`St. Misael - Martyr. St. Azarias - Martyr. St. Alice. St. Ananias - Martyr`,
                    color:`Red`,
                },
                {
                    date:`${year}-12-17`,
                    feast:``,
                    saint:`St. Lazarus`,
                    color:`White`,
                },
                {
                    date:`${year}-12-18`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-12-19`,
                    feast:``,
                    saint:`St. Urban V`,
                    color:`White`,
                },
                {
                    date:`${year}-12-20`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-12-21`,
                    feast:``,
                    saint:`St. Thomas - Apostle`,
                    color:`White`,
                },
                {
                    date:`${year}-12-22`,
                    feast:``,
                    saint:`St. Zeno`,
                    color:`White`,
                },
                {
                    date:`${year}-12-23`,
                    feast:``,
                    saint:`St. Yvo of Chartres`,
                    color:`White`,
                },
                {
                    date:`${year}-12-24`,
                    feast:``,
                    saint:`Sts. Adam & Eve`,
                    color:`White`,
                },
                {
                    date:`${year}-12-25`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-12-26`,
                    feast:``,
                    saint:`St. Stephen`,
                    color:`White`,
                },
                {
                    date:`${year}-12-27`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-12-28`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-12-29`,
                    feast:``,
                    saint:``,
                    color:``,
                },
                {
                    date:`${year}-12-30`,
                    feast:``,
                    saint:`St. Sabinus`,
                    color:`White`,
                },
                {
                    date:`${year}-12-31`,
                    feast:``,
                    saint:`St. Sylvester. St. Catherine Laboure`,
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

export async function fixedSundayFeasts() {

    const response= await getCalendar()

    const ashWednesdayDates= response ? response[0]?.ashWednesday : []


    const data1=[
        {
            feast:`1st Sunday after Epiphany.\n`,
            color:`White`,
        },
        {
            feast:`2nd Sunday After Epiphany.\n`,
            color:`Green`,
        },
        {
            feast:`3rd Sunday after Epiphany.\n`,
            color:`Green`,
        },
        {
            feast:`4th Sunday after Epiphany.\n`,
            color:`Green`,
        },
        {
            feast:`5th Sunday after Epiphany.\n`,
            color:`Green`,
        },
        {
            feast:`6th Sunday after Epiphany.\n`,
            color:`Green`,
        },
        {
            feast:`7th Sunday after Epiphany.\n`,
            color:`Green`,
        },
        {
            feast:`8th Sunday after Epiphany.\n`,
            color:`Green`,
        },
        {
            feast:`9th Sunday after Epiphany.\n`,
            color:`Green`,
        },
        {
            feast:`10th Sunday after Epiphany.\n`,
            color:`Green`,
        },
        
    ]

    const data2=[
        
        {
            feast:`Septuagesima.\n`,
            color:`Purple`,
        },
        {
            feast:`Sexagesima.\n`,
            color:`Purple`,
        },
        {
            feast:`Quinquagesima.\n`,
            color:`Purple`,
        },
    ]

    const data3=[
        
        {
            feast:`First Sunday of Lent.\n`,
            color:`Purple`,
        },
        {
            feast:`Second Sunday of Lent.\n`,
            color:`Purple`,
        },
        {
            feast:`Third Sunday of Lent.\n`,
            color:`Purple`,
        },
        {
            feast:`Fourth Sunday of Lent (Laetare).\n`,
            color:`Rose/White`,
        },
        {
            feast:`Passion Sunday.\n`,
            color:`Purple`,
        },
        {
            feast:`Palm Sunday.\n`,
            color:`Red/Purple`,
        },
        {
            feast:`Easter Sunday.\n`,
            color:`White`,
        },
    ]

    const data4=[
        
        {
            feast:`Solemn Easter Vigil and First Mass of Easter Sunday.\n`,
            color:`Purple`,
        },
        {
            feast:`Good Friday.\n`,
            color:`Black/Purple`,
        },
        {
            feast:`Holy Thursday.\n`,
            color:`Purple/White`,
        }
        
    ]

    return {data1, data2, data3, data4, ashWednesdayDates}

}