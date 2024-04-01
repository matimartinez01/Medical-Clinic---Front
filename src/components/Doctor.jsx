import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const Doctor = (props) => {

    let textColor = ""


    return (
        <div className="w-full bg-blue-200 flex gap-x-1 text-center items-center md:text-lg md:font-semibold">
              <p className="w-1/5">{props.name}</p>
              <p className="w-2/4 text-center">{props.email}</p>
              <p className="w-1/5">{props.speciality}</p>
              <p className="text-3xl font-extrabold text-blue-800 text-right md:text-center w-1/5"><Link className="hover:scale-110 hover:text-[#F19E22]" to={`/doctorsAdmin/${props.id}`}>+</Link></p>
        </div>
    )
}

Doctor.PropTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    speciality: PropTypes.string.isRequired
}


export default Doctor