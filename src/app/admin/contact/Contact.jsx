"use client";

import './Contact.css'
import { FaPhone, FaWhatsapp, FaEnvelope, FaEdit  } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";

const Contact = () => {
    return(
        <Container_Contact/>
    );
}

const Container_Contact = () => {
    {/* Modal Header Contact */}
    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState("null");
    const [subtitle, setSubtitle] = useState("null");

    const [initialImage, setInitialImage] = useState("");
    const [initialSubtitle, setInitialSubtitle] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imgURL = URL.createObjectURL(file);
            setImage(imgURL);
        }
    };

    const openHeaderModal = () => {
        setInitialImage(image);
        setInitialSubtitle(subtitle);
        setShowModal(true);
    };

    const closeHeaderModal = () => {
        setImage(initialImage);
        setSubtitle(initialSubtitle);
        setShowModal(false);
    };

    {/* Modal Contact */}
    const [showContactModal, setShowContactModal] = useState(false);
    const [phone, setPhone] = useState("null");
    const [whatsapp, setWhatsapp] = useState("null");
    const [email, setEmail] = useState("null");

    const [initialPhone, setInitialPhone] = useState("");
    const [initialWhatsapp, setInitialWhatsapp] = useState("");
    const [initialEmail, setInitialEmail] = useState("");

    const openContactModal = () => {
        setInitialPhone(phone);
        setInitialWhatsapp(whatsapp);
        setInitialEmail(email);
        setShowContactModal(true);
    };

    const closeContactModal = () => {
        setPhone(initialPhone);
        setWhatsapp(initialWhatsapp);
        setEmail(initialEmail);
        setShowContactModal(false);
    };

    {/* Modal Alamat Contact */}
    const [showAlamatContactModal, setShowAlamatContactModal] = useState(false);
    const [textAreaValue, setTextAreaValue] = useState("");
    const [initialAddress, setInitialAddress] = useState("");

    const openAlamatModal = () => {
        setInitialAddress(textAreaValue);
        setShowAlamatContactModal(true);
    };

    const closeAlamatModal = () => {
        setTextAreaValue(initialAddress);
        setShowAlamatContactModal(false);
    };

    // get api
    const [dataKontak, setDataKontak] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContactInfo = async () => {
        try {
            const res = await fetch("/api/contact-info");
            const result = await res.json();
            setDataKontak(result);
        } catch (err) {
            console.error("Gagal memuat dataKontak contact_info", err);
        } finally {
            setLoading(false);
        }
        };

        fetchContactInfo();
    }, []);

    useEffect(() => {
        if (dataKontak) {
            setImage(dataKontak.bannerUrl);
            setSubtitle(dataKontak.bannerText);
            setPhone(dataKontak.phone);
            setWhatsapp(dataKontak.whatsapp);
            setEmail(dataKontak.email);
            setTextAreaValue(dataKontak.address);
        }
    }, [dataKontak]);

    // button simpan
    const handleSaveAlamat = async () => {
        try {
            const res = await fetch("/api/contact-info", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                address: textAreaValue,
            }),
            });

            if (!res.ok) throw new Error("Gagal menyimpan data");

            setShowAlamatContactModal(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSaveContacPhone = async () => {
        try {
            const res = await fetch("/api/contact-info", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                phone: phone,
                whatsapp: whatsapp,
                email: email,
            }),
            });

            if (!res.ok) throw new Error("Gagal menyimpan data");

            setShowContactModal(false);
        } catch (err) {
            console.error("Gagal menyimpan alamat:", err);
        }
    };

    const handleHeaderImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const filename = file.name;
            const imagePath = `/images/kontak/${filename}`;
            setImage(imagePath);
        }
    };

    const handleSaveHeader = async () => {
        try {
            const res = await fetch("/api/contact-info", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                bannerText: subtitle,
                bannerUrl: image,
            }),
            });

            if (!res.ok) throw new Error("Gagal menyimpan header");

            const result = await res.json();
            console.log("Header berhasil diperbarui:", result);
            setShowModal(false);
        } catch (error) {
            console.error("Gagal menyimpan header:", error);
            alert("Gagal menyimpan header");
        }
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
        const res = await fetch("/api/upload-contact-image", {
            method: "POST",
            body: formData,
        });

        if (!res.ok) {
            alert("Gagal upload gambar");
            return;
        }

        const data = await res.json();
        setImage(data.imageUrl);
        } catch (err) {
        console.error("Upload error:", err);
        alert("Terjadi kesalahan saat upload");
        }
    };
    

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!dataKontak) {
        return <p>DataKontak tidak tersedia</p>;
    }


    return(
            <>
                {/* Header Contact */}            
                <div className="container-header-contact">
                    <div className="section-header-contact">
                        <button
                            className="edit-button-header-contact"
                            onClick={openHeaderModal}
                        >
                        Edit <FaEdit className="icon-edit-header-contact" />
                        </button>

                        <img src={image} alt="Banner" className="background-image-header-contact" />
                        <div className="overlay-text-header-contact">
                            <h2>Kontak</h2>
                            <p>{subtitle}</p>
                        </div>
                    </div>

                    {/* Modal Header Contact */}
                    {showModal && (
                        <div className="modal-overlay-header-contact">
                            <div className="modal-header-contact">
                                <div className="modal-close-button-header-contact" onClick={closeHeaderModal}>
                                    <IoClose />
                                </div>                              
                                <h3>Edit Header</h3>
                                <label>
                                    Ganti Gambar:
                                    <input type="file" accept="image/*" onChange={handleUpload } />
                                </label>
                                <label>
                                    Subjudul :
                                    <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
                                </label>
                                <div className="modal-actions-header-contact">
                                    <button onClick={handleSaveHeader}>Simpan</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

    
                {/* contact */}
                <div className="container-contact">
                    <button
                        className="edit-button-contact"
                        onClick={openContactModal}
                    >
                        Edit <FaEdit className="icon-edit-contact" />
                    </button>

                    <div className="section-contact">
                        <div className="header-contact">
                        <h2 className="title-contact">Hubungi Kami</h2>
                        <p className="sub-title-contact">
                            untuk informasi lebih detail mengenai pendaftaran dan hal lainnya
                            segera hubungi kami
                        </p>
                        </div>

                        <div className="card-contact-wrapper">
                            <div className="contact-card">
                                <div className="icon-wrapper-contact">
                                    <FaPhone className="icon-contact" />
                                </div>
                                <h3>Telepon</h3>
                                <a href={`tel:${phone}`} className="contact-link">
                                {phone}
                                </a>
                            </div>

                            <div className="contact-card">
                                <div className="icon-wrapper-contact">
                                    <FaWhatsapp className="icon-contact" />
                                </div>
                                <h3>WhatsApp</h3>
                                <a
                                    href={`https://wa.me/${whatsapp}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-link"
                                >
                                +{whatsapp.replace(/(\d{2})(\d{3})(\d{4})(\d{3})/, "$1 $2-$3-$4")}
                                </a>
                            </div>

                            <div className="contact-card">
                                <div className="icon-wrapper-contact">
                                    <FaEnvelope className="icon-contact" />
                                </div>
                                <h3>Email</h3>
                                <a href={`mailto:${email}`} className="contact-link">
                                {email}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Modal */}
                    {showContactModal && (
                        <div className="modal-overlay-contact">
                            <div className="modal-contact">
                                <div
                                    className="modal-close-button-contact"
                                    onClick={closeContactModal}
                                >
                                <IoClose />
                                </div>
                                <h3>Edit Kontak</h3>

                                <label>
                                    Telepon:
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </label>

                                <label>
                                    WhatsApp (tanpa +):
                                    <input
                                        type="text"
                                        value={whatsapp}
                                        onChange={(e) => setWhatsapp(e.target.value)}
                                    />
                                </label>

                                <label>
                                    Email:
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </label>

                                <div className="modal-actions-contact">
                                    <button onClick={handleSaveContacPhone}>Simpan</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
    
                {/* Alamat */}
                <div className="container-alamat">
                    <button className="edit-button-alamat" onClick={openAlamatModal}>
                        Edit <FaEdit className="icon-edit-alamat" />
                    </button>

                    <div className="section-alamat">
                        <div className="header-alamat">
                            <h2 className="title-alamat">Alamat</h2>
                        </div>

                        <div className="body-alamat">
                            <div className="alamat-card">
                                <h3>Pondok Pesantren Darur Rosyid</h3>
                                <p>{textAreaValue}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {showAlamatContactModal && (
                    <div className="modal-overlay-contact">
                        <div className="modal-contact">
                            <div
                                className="modal-close-button-contact"
                                onClick={closeAlamatModal}
                            >
                            <IoClose />
                            </div>
                            <h3>Edit Kontak</h3>

                            <label>
                                Alamat:
                                <textarea
                                    className="modal-textarea-contact"
                                    placeholder="Alamat"
                                    value={textAreaValue}
                                    onChange={(e) => setTextAreaValue(e.target.value)}
                                ></textarea>    
                            </label>

                            <div className="modal-actions-contact">
                                <button onClick={handleSaveAlamat}>Simpan</button>
                            </div>
                        </div>
                    </div>
                )}

    
                {/* Maps */}
                <div className="container-maps">
                    <div className="sections-maps">
                        <iframe
                            className="maps"
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.405933163134!2d106.707281!3d-6.1071349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a02dae694b7c7%3A0xa6d5190ab1410046!2sPondok%20Pesantren%20Darur%20Rosyid!5e0!3m2!1sid!2sid!4v1716280000000!5m2!1sid!2sid">
                        </iframe>
                    </div>
                </div>
    
            </>
        );
}

export default Contact;
