"use client"

import { DayTime } from "..";
import { addDays, format, formatDuration, intervalToDuration } from "date-fns";
import { Footer } from "../footer";
import { AshWenesday } from "../resources/calendar";
import React from "react";
import NavbarB4Login from "../header/headerB4Login";

export default function HomePage({session}) {

  const date=new Date()

  const [TABLE_ROWS, setTABLE_ROWS]=React.useState([])
  const today = new Date().toISOString().split('T')[0];

  React.useEffect(()=>{
    getTables()
  },[])

  const getTables=async()=>{
    const table_ROWS =await AshWenesday(date.getFullYear())
    setTABLE_ROWS(table_ROWS)
  }

  const yearsAgo=(date)=>{

    let totalDuration=intervalToDuration({
        start:new Date(date),
        end:new Date()
    })

    let textDuration=formatDuration(totalDuration,{format:['years','months','days'], delimiter:','})

    return textDuration
    
  }

  const getDate=(date)=>{
    const currentDate = new Date(date);
    const formattedDate = format(currentDate, 'EEEE, MMMM d, yyyy');

    return formattedDate
  }

  const saintToday=()=>{

    const todayObject = TABLE_ROWS?.flatMap(obj => obj.details).find(detail => detail.date === today);

    return todayObject
  }


  const commingFeast=(value)=>{

    let todayObject = TABLE_ROWS?.flatMap(obj => obj.details).find(detail => detail.date === today);

    let nextDate=today

    while (todayObject && (!todayObject.feast || todayObject.feast.trim() === '')) {
      nextDate = addDays(nextDate,1)
      const nextDateString = format(nextDate, 'yyyy-MM-dd');
      
    //   // Find the next object with the next date
      let nextObject = TABLE_ROWS?.flatMap(obj => obj.details).find(detail => detail.date === nextDateString);

      // console.log(todayObject);
      
      todayObject = nextObject;
      
      if (!nextObject) {
        break;
      }
      
    }

    let returnValue

    if (value ===1) {
      returnValue=todayObject
      
    } else {
      returnValue=DayTime(todayObject?.date)
    }

    return returnValue

    
  }


  return (
    
    <>

      <main>
        <NavbarB4Login session={session}/>

      </main>

        <section style={{backgroundImage: "url('/images/background.jpg')", backgroundSize: "cover"}} className='pb-2 '>

          <main className='col-md-12'>

            <div className='flex justify-center'>
              <img src="/images/logo.jpg" alt="Logo Picture" className="rounded-full m-2">
              
              </img>
            </div>

            <div className='flex flex-wrap justify-between'>
              <div className="text-center m-2 ms-2 me-2">
                <div className="">
                  <p className="text-lg text-light fw-bold text-3xl">
                      Saint (s) of the Day
                  </p>
                  <p className="text-light font-small">
                    {saintToday()?.saint}
                  </p>
                  <p className="text-light font-small">
                  {saintToday(1)?.color ? <span><span className='text-warning'>{saintToday(1)?.color}</span> Vestment</span> : ''} 
                  </p>
                  
                </div>
                <button className="px-4 py-1 text-dark bg-light
                font-bold rounded-full border border-info ">{DayTime()}</button>
              </div>

              <div className="text-center m-2 me-2 ms-2">
                <div className="">
                  <p className="text-lg text-light fw-bold text-3xl">
                    Next Major Feast
                  </p>
                  <p className="text-light font-small">
                    {commingFeast(1)?.feast} 
                  </p>
                  <p className="text-light font-small">
                    <span className='text-warning'>{commingFeast(1)?.color}</span> Vestment
                  </p>
                  
                </div>
                <button className="px-4 py-1 text-dark bg-light
                font-bold rounded-full border border-info 
                ">{commingFeast(2)}</button>
              </div>
            </div>

            <div className='mt-5'>
              <p class="text-center text-light fw-bold text-4xl ">
                Legion Maria Church
              </p>
              <p className="text-light font-small p-2 ms-2 me-2">
                This religion was founded by Mary (<span className='text-warning fw-bold'>Mama Maria</span>) mother of Jesus Christ and Her son Jesus Christ (<span className='text-warning fw-bold'>Baba Simeo Hosea Lodvikus</span>) in Africa, Kenya in 1963, after Kenya got independence.
              </p>
            </div>

            <div className=''>
              <p className="text-center text-light fw-bold text-4xl">
                What is Prayer?
              </p>
              <p className="text-light font-small p-2 ms-2 me-2">
                  <span className='fw-bold'>&apos;Prayer is communicating with God.&apos; </span>
                  Every Christian has a direct line of communication with God, available at all times.
                  Prayer is much more than word, it is an expression of the heart and mind towards God. It is also an experience, a relationship with God, not an activity. As a child of God, you are invited to come boldly before His throne.
                  &apos;Since we have a greate high priest who has gone through the heavens, Jesus the Son of God, let us...then approach the throne of grace with confidence, so that we may receive mercy and find grace to help us in our time of need,&apos; Paul writes.
              </p>
            </div>
            
          </main>


        </section>

        <section style={{backgroundImage: "url('/images/background.jpg')", backgroundSize: "cover"}} className='pb-2'>
        <main className='col-md-12'>
          <div>
            <div className='p-2 ms-2 me-2'>
              <p class="text-center text-light fw-bold text-3xl">
                Our Leaders
              </p>
              <p class="text-light font-small">
                  Legion Maria is led by the Holy Spirit under (<span className='text-warning fw-bold'>Mama Maria</span>), mother of Jesus Christ and Her Son Jesus Christ (<span className='text-warning fw-bold'>Baba Simeo Hosea Lodvikus</span>) who are the Spiritual Leaders and Founders of the Church here in Africa. Our earthly leader is His Holiness, the Pope.
              </p>
            </div>

            <div className='flex flex-wrap justify-center gap-5'>
              <div className='col-md-3 m-1 ms-2' >
                <div >
                <img src="/images/mama1.jpg" alt="Logo Picture" className="w-full" />
                </div>
                <div className='text-light'>
                  <p class="text-center fw-bold text-xl">
                      Mama Bikira Maria
                  </p>
                  <p class="font-small">
                    She is a Spritual Leader and Founder of the Legion Maria Church. She is the one who brought Legion Maria Church here in Africa from Heaven. <br/>She died on {getDate('1966/12/22')} at St. Mary Effeso Nzoia where She was burried 2 days after ({getDate('1966/12/24')}) Her death. <br />
                  </p>
                  <p>
                      It has been 
                      <button class="px-4 py-1 text-sm text-dark
                    font-bold rounded-full border border-info bg-light
                    ">{yearsAgo('1966/12/22')}</button> 
                    since Her death.

                  </p>
                </div>

              </div>

              <div className='col-md-3 m-1 ms-2' >
                <div >
                <img src="/images/baba1.jpg" alt="Logo Picture" className="w-full" />
                </div>
                <div className='text-light'>
                  <p class="text-center fw-bold text-xl">
                    Baba Simeo Melkio Messias
                  </p>
                  <p class="font-small">
                    He is the Son of Holy Mama Bikira Maria. Mama Maria and Baba Simeo are one in spirit and together they are Spritual Leaders and Founders of the Legion Maria Church. <br/>Baba Simeo died on {getDate('1991/09/14')} at St. Joannes Kodero and was burried twice,  Jerusalem Amoyo and Got Calvary respectively. <br />
                  </p>
                  <p>
                      It has been 
                      <button class="px-3 py-1 text-sm text-dark
                    font-bold rounded-full border border-info bg-light
                    ">{yearsAgo('1991/09/14')}</button> 
                    since His death.

                  </p>
                </div>

              </div>

              <div className='col-md-3 m-1 ms-2' >
                <div >
                <img src="/images/papa1.jpg" alt="Logo Picture" className="w-full" />
                </div>
                <div className='text-light'>
                  <p class="text-center fw-bold text-xl">
                    Pope Timothy Joseph Ahitla
                  </p>
                  <p class="text-center font-small">
                    1963-1998
                  </p>
                  <p class="text-center font-small">
                    The first Pope of Legion Maria of African Church Mission. He was chosen by Mama Maria while he was still young.
                    He took over officially as Legion Maria leader after the death of Baba Simeo.
                  </p>
                  
                </div>

              </div>

              <div className='col-md-3 m-1 ms-2' >
                <div >
                <img src="/images/papa2.jpg" alt="Logo Picture" className="w-full" />
                </div>
                <div className='text-light'>
                  <p class="text-center fw-bold text-xl">
                    Pope Lawrence Jairo Chiaji
                  </p>
                  <p class="text-center font-small">
                    1998-2004
                  </p>

                  <p>
                  The second Pope of Legion Maria of African Church Mission.
                  </p>
                  
                </div>

              </div>

              <div className='col-md-3 m-1 ms-2' >
                <div >
                <img src="/images/papa3.jpg" alt="Logo Picture" className="w-full" />
                </div>
                <div className='text-light'>
                  <p class="text-center fw-bold text-xl">
                    Pope Raphael Titus Otieno
                  </p>
                  <p class="text-center font-small">
                    2004-Present
                  </p>
                  <p>
                    The third and current Pope of Legion Maria of African Church Mission.
                  </p>
                </div>

              </div>
              
            </div>
          </div>
        </main>
        </section>

        {/* <section class="ftco-section ftco-no-pt ftco-no-pb ftco-counter img" id="section-counter">
          <div class="container">
            <div class="row d-md-flex align-items-center">
              <div class="col-md d-flex justify-content-center counter-wrap ftco-animate">
                <div class="block-18">
                  <div class="text">
                    <strong class="number" data-number="100">0</strong>
                    <span>Awards</span>
                  </div>
                </div>
              </div> 
              <div class="col-md d-flex justify-content-center counter-wrap ftco-animate">
                <div class="block-18">
                  <div class="text">
                    <strong class="number" data-number="4">0</strong>
                    <span>Complete Projects</span>
                  </div>
                </div>
              </div>
              <div class="col-md d-flex justify-content-center counter-wrap ftco-animate">
                <div class="block-18">
                  <div class="text">
                    <strong class="number" data-number="4">0</strong>
                    <span>Happy Customers</span>
                  </div>
                </div>
              </div>
              <div class="col-md d-flex justify-content-center counter-wrap ftco-animate">
                <div class="block-18">
                  <div class="text">
                    <strong class="number" data-number="2">0</strong>
                    <span>Cups of coffee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        <main style={{backgroundImage: "url('/images/background.jpg')", backgroundSize: "cover"}}>
        <Footer />
        </main>

    </>
  );
}