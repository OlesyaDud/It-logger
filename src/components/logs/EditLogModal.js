import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import TechSelectOptions from '../techs/TechSelectOptions';
import PropTypes from 'prop-types';
import {updateLog} from '../../actions/logActions';
import M from 'materialize-css/dist/js/materialize.min.js';


const EditLogModal = ({current, updateLog}) => {

    const [message, setMessage] = useState('');
    const [attention, setAttention] = useState(false);
    const [tech, setTech] = useState('');

    useEffect(()=> {
        if(current) {
            setAttention(current.attention);
            setMessage(current.message);
            setTech(current.tech);
        }
    }, [current]);

    const onSubmit =() => {
        if(message === "" || tech === "") {
            M.toast({ html: "Please enter a message and tech "});
        } else {
            console.log(message, tech, attention);
            const updatedtLog = {
                id: current.id,
                message,
                attention,
                tech,
                date: new Date()
            }

            updateLog(updatedtLog);
            M.toast({htmp: `Log updated by ${tech}`});

            // clear fields
            setAttention(false);
            setMessage("");
            setTech("");
        }
    }

    return (
        <div id='edit-log-modal' className="modal" style={modalStyle}>
            <div className="modal-content">
                <h4>Enter System Log</h4>
                <div className="row">
                    <div className="input-field">
                        <input type="text" name="message" value={message} onChange={e => setMessage(e.target.value)} />
                    </div>
                </div>

                <div className="row">
                    <div className="inpit-field">
                        <select name="tech" value={tech} className="browser-default" onChange={e => setTech(e.target.value)}>
                            <option value="" disabled> Select Technitian </option>
                            <TechSelectOptions />
                            {/* <option value="A">Aaa</option>
                            <option value="B">Bbb</option>
                            <option value="C">Ccc</option>
                            <option value="D">Ddd</option> */}
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field">
                        <p>
                            <label>
                                <input type="checkbox" className="filled-in" checked={attention} value={attention} onChange={e => setAttention(!attention)} />
                                <span>Needs Attention</span>
                            </label>
                        </p>
                    </div>
                </div>
            </div>

            <div className="modal-footer">
                <a href="#!"
                onClick={onSubmit}
                className="modal-close wave-effect waves-green btn"
                >Enter</a>
            </div>
        </div>
    )
}

const modalStyle = {
    width: '75%',
    height: '75%'
}

EditLogModal.propTypes = {
    current: PropTypes.object,
    updateLog: PropTypes.func.isRequired
}

// want to bring current value to fill form data
const mapStateToProps = state => ({
    current: state.log.current
});

export default connect(mapStateToProps, {updateLog}) (EditLogModal);
