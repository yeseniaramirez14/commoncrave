import andrew from '../images/andrew.jpg';
import yesenia from '../images/yesenia.jpg';
import Github from '../images/icons/Github.png';
import Discord from '../images/icons/Discord.png'
import LinkedIn from '../images/icons/LinkedIn.png'
import Portfolio from '../images/icons/Portfolio.png'

const AboutUs = () => {
    return (
        <div className="h-screen flex-col items-center font-worksans bg-yellow">
            <h1 className="text-center font-bold text-3xl pt-5 pb-3 text-green">About Us</h1>
            <div className="border border-solid rounded-2xl p-5 mt-2 m-10 border-green border-2"> 
                <p className="text-center">Chocolate cake fruitcake gingerbread gingerbread pie cotton candy soufflé muffin. Toffee cheesecake jelly beans pastry lemon drops soufflé. Jelly beans cookie lemon drops topping chocolate cake wafer cookie. Ice cream jelly-o shortbread cake lollipop sweet cupcake. </p>
                <p className="text-center pt-2"> Powder biscuit soufflé chocolate cake chocolate chupa chups gummies powder. Toffee muffin tart sesame snaps gingerbread candy canes cheesecake. Cheesecake soufflé pudding jelly tart.</p>
            </div>
            <div className="grid grid-cols-2 p-5 m-10">
                <div className="grid-col-1 text-center text-2xl">
                    Andrew
                    <div className='pb-[3px] pt-10'>
                        <img className='rounded-full w-1/3 m-auto' src={andrew} alt="andrew"></img>
                    </div>
                    <div className="flex justify-evenly p-5">
                        <button type="button">
                            <img className="w-10" src={Github} alt="github icon"/>
                        </button>
                        <button type="button">
                            <img className="w-10" src={LinkedIn} alt="linkedin icon"/>
                        </button>
                        <button type="button">
                            <img className="w-10" src={Discord} alt="discord icon"/>
                        </button>
                        <button type="button">
                            <img className="w-9" src={Portfolio} alt="portfolio icon"/>
                        </button>
                    </div>
                </div>
                <div className="h-1/2 absolute left-1/2 -ml-0.5 w-0.5 bg-green"></div>
                <div className="grid-col-2 text-center text-2xl">
                    Yesenia
                    <div className='pt-10'>
                        <img className='rounded-full w-1/3 m-auto' src={yesenia} alt="yesenia"></img>
                    </div>
                    <div className="flex justify-evenly p-5">
                        <button type="button">
                            <img className="w-10" src={Github} alt="github icon"/>
                        </button>
                        <button type="button">
                            <img className="w-10" src={LinkedIn} alt="linkedin icon"/>
                        </button>
                        <button type="button">
                            <img className="w-9" src={Portfolio} alt="portfolio icon"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs;