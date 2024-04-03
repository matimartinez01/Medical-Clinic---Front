import propTypes from "prop-types"
import { Link } from "react-router-dom"

const Doctor = (props) => {

    let textColor = ""


    return (
        <div className="w-full bg-blue-200 flex gap-x-1 items-center md:text-lg md:font-semibold text-left">
            <p className="w-1/5 text-left pl-2">{props.name}</p>
            <p className="w-1/3 text-left pl-2">{props.email}</p>
            <p className="w-1/5 max-[550px]:hidden text-left pl-2">{props.speciality}</p>
            <p className="w-1/5 min-[550px]:hidden text-left pl-2 max-[550px]:pl-6">{props.speciality.slice(0,9)}</p>
            <p className="text-3xl font-extrabold text-blue-800 text-right md:text-center w-1/5"><Link className="hover:scale-110 hover:text-[#F19E22]" to={`/doctorsAdmin/${props.id}`}>+</Link></p>
        </div>
    )
}

Doctor.propTypes = {
    name: propTypes.string.isRequired,
    email: propTypes.string.isRequired,
    id: propTypes.number.isRequired,
    speciality: propTypes.string.isRequired
}


export default Doctor