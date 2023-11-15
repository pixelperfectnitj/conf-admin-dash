import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import LoadingIcon from "../components/LoadingIcon";
const Contacts = () => {
    const params = useParams();
    const IdConf = params.confid;
    const initialData={
        "confId": IdConf,
        "title": "",
        "name": "",
        "designation": "",
        "imgLink": "",
        "institute": "",
        "profileLink": "",
        "phone": "",
        "email": "",
        "fax": "",
        "feature": true,
        "sequence": 0

    }
    const [formData, setFormData] = useState(initialData);

    const [editID, setEditID] = useState("");
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(false);

    const { title, name, designation, imgLink, institute, profileLink, phone, email, fax } = formData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "sequence") {
            setFormData({
                ...formData,
                [name]: parseInt(value),
            });
        }
        else if (name === "feature") {
            setFormData({
                ...formData,
                [name]: value==="true",
            });
        }
    
        else{
            setFormData({
                ...formData,
                [name]: value,
            });
        }
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${import.meta.env.VITE_API_URL}/contactUs`, formData, {
            headers: {
                Authorization: import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                setData([...data, res.data]);
                setFormData(initialData);
                setRefresh(refresh + 1);
            })
            .catch(err => {
                console.log(err);
                console.log(formData);
            });
    };

    const handleUpdate = () => {
        axios.put(`${import.meta.env.VITE_API_URL}/contactUs/${editID}`, formData, {
            headers: {
                Authorization: import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                setFormData(initialData);
                setRefresh(refresh + 1);
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (deleteID) => {
        axios.delete(`${import.meta.env.VITE_API_URL}/contactUs/${deleteID}`, {
            headers: {
                Authorization: import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                console.log('DELETED RECORD::::', res);
                setRefresh(refresh + 1);
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (editIDNotState) => {
        axios.get(`${import.meta.env.VITE_API_URL}/contactUs/${editIDNotState}`, {
            headers: {
                Authorization: import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                setFormData(res.data);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        setLoading(true);
        axios.get(`${import.meta.env.VITE_API_URL}/contactUs/${IdConf}`, {
            headers: {
                Authorization: import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, [refresh]);

    return (
        <main className='py-10 bg-gray-100 lg:pl-72 min-h-screen'>
            <div className='px-4 sm:px-6 lg:px-8'>
                <form className="bg-blue-100 shadow-md rounded px-8 pt-6 pb-8 m-10" autoComplete="off"
                onSubmit={handleSubmit}>
                    <div className="text-blue-700 text-[28px] font-serif mx-auto my-auto grid place-content-center">Add New Contact Details</div>
                    <label className="block text-gray-700 text-lg ml-1 font-bold">Title</label>
                    <input type="text" name="title" required value={title} onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-700   leading-tight    focus:outline-none focus:shadow-outline" />

                    <label className="block text-gray-700 text-lg ml-1  font-bold">Name</label>
                    <input type="text" name="name" required value={name} onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-700   leading-tight    focus:outline-none focus:shadow-outline" />

                    <label className="block text-gray-700 text-lg ml-1 font-bold">Designation</label>
                    <input type="text" name="designation" required value={designation} onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-700   leading-tight    focus:outline-none focus:shadow-outline" />

                    <label className="block text-gray-700 text-lg ml-1 font-bold">Institute</label>
                    <input type="text" name="institute"required value={institute} onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-700   leading-tight    focus:outline-none focus:shadow-outline" />

                    <label className="block text-gray-700 text-lg ml-1 font-bold">Profile Link </label>
                    <input type="text" name="profileLink"required value={profileLink} onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-700   leading-tight    focus:outline-none focus:shadow-outline" />

                    <label className="block text-gray-700 text-lg ml-1 font-bold">Image Link</label>
                    <input type="text" name="imgLink" value={imgLink} onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-700   leading-tight    focus:outline-none focus:shadow-outline" />

                    <label className="block text-gray-700 text-lg ml-1 font-bold">Phone</label>
                    <input type="text" name="phone" required value={phone} onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-700   leading-tight    focus:outline-none focus:shadow-outline" />
                    <label className="block text-gray-700 text-lg ml-1 font-bold">Email</label>
                    <input type="text" name="email" required value={email} onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-700   leading-tight    focus:outline-none focus:shadow-outline" />
                    <label className="block text-gray-700 text-lg ml-1 font-bold">Fax</label>
                    <input type="text" name="fax" value={fax} onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-700   leading-tight    focus:outline-none focus:shadow-outline" />
 <label className="block text-gray-700 text-lg ml-1 font-bold">Feature</label>
                    <select name="feature" className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-700   leading-tight    focus:outline-none focus:shadow-outline" onChange={handleChange}>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>

                    </select>

                    <label className="block text-gray-700 text-lg ml-1 font-bold ">Sequence<input
                        type="number"
                        name="sequence"
                        value={formData.sequence}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-500   leading-tight    focus:outline-none focus:shadow-outline"
                    /></label>
                    <div className="flex justify-evenly">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Contact</button>
                        <button type="submit" onClick={() => { handleUpdate() }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update Contact</button>
                    </div>
                </form>

                <hr />

                <div className="shadow-md m-10 ali">
                    <div className="text-black-700 text-[28px] font-serif mx-auto my-auto grid place-content-center">Added contacts</div>
                    {loading ? (
                        <div>
<LoadingIcon/>                        </div>
                    ) : (
                        <table className="min-w-full border-collapse box-border">
                            <thead>
                                <tr className="border-[2px] bg-blue-100  border-blue-500">
                                    <th className="p-1 text-center">Title</th>
                                    <th className="p-1 text-center">Name</th>
                                    <th className="p-1 text-center">Designation</th>
                                    <th className="p-1 text-center">Institute</th>
                                    <th className="p-1 text-center">Phone</th>
                                    <th className="p-1 text-center">Email</th>
                                    <th className="p-1 text-center">Fax</th>
                                    <th className="p-1 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length>0?data.map((item, index) => (
                                    <tr key={index} className="border-[1px] font-serif border-blue-500">
                                        <td className="p-1 text-center">{item.title}</td>
                                        <td className="p-1 text-center">{item.name}</td>
                                        <td className="p-1 text-center">{item.designation}</td>
                                        <td className="p-1 text-center">{item.institute}</td>
                                        <td className="p-1 text-center">{item.phone}</td>
                                        <td className="p-1 text-center">{item.email}</td>
                                        <td className="p-1 text-center">{item.fax}</td>
                                        <td className="p-1 text-center  flex justify-evenly">
                                            <button onClick={() => { handleEdit(item._id); setEditID(item._id) }} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline"> Edit </button>{" "}
                                            <button onClick={() => handleDelete(item._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold  px-4 rounded focus:outline-none focus:shadow-outline"> Delete </button>
                                        </td>
                                    </tr>
                                )): (
                                    <tr>                                        
                                        <td colSpan="7" className="p-1 text-center">No data available</td>
                                    </tr>

                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Contacts;
