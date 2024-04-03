import propTypes from "prop-types"
import { Link } from "react-router-dom"

const Patient = (props) => {
    let type = props.type
    let borderColor = ""
    let textColor = ""


    return (
        <div className="w-full bg-blue-200 flex gap-x-1 text-left items-center md:text-lg md:font-semibold">
            <p className={"w-1/4 text-left pl-2" + textColor}>{props.name}</p>
            <p className="w-2/4 text-left px-2">{props.email}</p>
            <p className="text-3xl font-extrabold text-blue-800 text-center w-1/4"><Link className="hover:scale-110 hover:text-[#F19E22]" to={`/patientDetail/${props.id}`}>+</Link></p>
        </div>
    )
}

Patient.propTypes = {
    name: propTypes.string.isRequired,
    email: propTypes.string.isRequired,
    birthDate: propTypes.string.isRequired,
    id: propTypes.number.isRequired
}


export default Patient