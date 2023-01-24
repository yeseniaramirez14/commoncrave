import andrew from '../images/andrew.jpg';
import yesenia from '../images/yesenia.jpg';
import github from '../images/github.svg';

const AboutUs = () => {
    return (
        <div className="h-screen flex-col items-center font-worksans bg-yellow">
            <h1 className="text-center font-bold text-3xl pt-5 pb-3 text-green">About Us</h1>
            <div className="border border-solid rounded-2xl p-5 mt-2 m-10 border-green border-2"> 
                <p className="text-center">Chocolate cake fruitcake gingerbread gingerbread pie cotton candy soufflé muffin. Toffee cheesecake jelly beans pastry lemon drops soufflé. Jelly beans cookie lemon drops topping chocolate cake wafer cookie. Ice cream jelly-o shortbread cake lollipop sweet cupcake. </p>
                <p className="text-center pt-2"> Powder biscuit soufflé chocolate cake chocolate chupa chups gummies powder. Toffee muffin tart sesame snaps gingerbread candy canes cheesecake. Cheesecake soufflé pudding jelly tart.</p>
            </div>
            <div className="grid grid-cols-2 p-5 m-10">
                <div className="grid-col-1">
                    Andrew
                    <div>
                        <img className='rounded-full w-1/3' src={andrew} alt="andrew"></img>
                    </div>
                    <div className="border-solid rounded-2xl p-5 border-green border-2">
                    <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" class="bg-green inline-block px-6 py-2.5 mb-2 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out">
                        <img className="w-5" src={github} alt="github icon"/>
                    </button>
                    </div>
                </div>
                <div className="h-1/2 absolute left-1/2 -ml-0.5 w-0.5 bg-green"></div>
                <div className="grid-col-2">
                    Yesenia
                    <div>
                        <img className='rounded-full w-1/3' src={yesenia} alt="yesenia"></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs;