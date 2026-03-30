import React, { useState } from "react";
import "../styles/PetProfile.css";
import Header from "../components/Header"

export default function PetProfile() {
  const [image, setImage] = useState("https://placekitten.com/400/400");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="page">
      <Header />

      <main className="main">
        <div className="profile-card">
          <h2 className="title">Профиль питомца</h2>

          <div className="layout">
            {/* LEFT */}
            <div className="left">
              <img src={image} alt="pet" className="pet-image" />

              <label className="upload-btn">
                Загрузить фото
                <input type="file" onChange={handleImageChange} hidden />
              </label>

              <div className="owner">
                <p className="owner-title">Хозяин</p>
                <p className="owner-name">Анна Петрова</p>
                <a href="#" className="owner-link">
                  Перейти в профиль →
                </a>
              </div>
            </div>

            {/* RIGHT */}
            <div className="right">
              <div className="field">
                <span>Кличка</span>
                <input defaultValue="Рыжик" />
              </div>

              <div className="field">
                <span>Город</span>
                <input defaultValue="Москва" />
              </div>

              <div className="field">
                <span>Возраст</span>
                <input defaultValue="3 года" />
              </div>

              <div className="field">
                <span>Порода</span>
                <input defaultValue="Британская короткошёрстная" />
              </div>

              <div className="field">
                <span>Окрас</span>
                <input defaultValue="Рыжий" />
              </div>

              <button className="save-btn">Сохранить изменения</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}