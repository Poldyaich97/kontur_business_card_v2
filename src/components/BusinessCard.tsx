import React, { useState } from "react";
import { User } from "../data/users";
import { Phone, Mail, Briefcase, X, MessageCircle } from "lucide-react"; // Добавляем MessageCircle
import { useCardRequests } from "../context/CardRequestContext";
import QRCode from "react-qr-code";
import styles from "./BusinessCard.module.css";

interface BusinessCardProps {
  user: User;
  showRequestModal: boolean;
  setShowRequestModal: (show: boolean) => void;
}

const transliterate = (text: string): string => {
  const transliterationMap: { [key: string]: string } = {
    // (карта транслитерации остается без изменений)
  };

  return text
    .split("")
    .map((char) => transliterationMap[char] || char)
    .join("");
};

export const BusinessCard: React.FC<BusinessCardProps> = ({
  user,
  showRequestModal,
  setShowRequestModal,
}) => {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [showQRCode, setShowQRCode] = useState(false);
  const { addRequest } = useCardRequests();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRequest({
      ...formData,
      employeeId: user.id,
      timestamp: new Date().toISOString(),
    });
    setShowRequestModal(false);
    setFormData({ name: "", phone: "" });
  };

  const downloadVCard = () => {
    const vCardContent = `BEGIN:VCARD
VERSION:3.0
N:${transliterate(user.name.replace(/, /g, ";"))}
FN:${transliterate(user.name)}
TEL;TYPE=CELL:${user.phone}
EMAIL:${user.email}
END:VCARD`;
    const blob = new Blob([vCardContent], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${user.name}.vcf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Создаем vCard как строку для передачи в QRCode
  const vCard = `BEGIN:VCARD
VERSION:3.0
N:${transliterate(user.name.replace(/, /g, ";"))}
FN:${transliterate(user.name)}
TEL;TYPE=CELL:${user.phone}
EMAIL:${user.email}
END:VCARD`;

  return (
    <>
      <div className={styles.card}>
        <h1 className={styles.header}>Контур</h1>

        <div className={styles.content}>
          <div className={styles.photoSection}>
            <img src={user.photo} alt={user.name} className={styles.photo} />
            <h2 className={styles.name}>{user.name}</h2>
          </div>

          <div className={styles.info}>
            <div className={styles.infoItem}>
              <Briefcase size={20} className={styles.icon} />
              <span>{user.position}</span>
            </div>

            <div className={styles.infoItem}>
              <Phone size={20} className={styles.icon} />
              <span>{user.phone}</span>
            </div>

            <div className={styles.infoItem}>
              <Mail size={20} className={styles.icon} />
              <span>{user.email}</span>
            </div>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button
            onClick={() => setShowQRCode(!showQRCode)}
            className={styles.qrButton}
          >
            {showQRCode ? "Скрыть QR" : "Показать QR"}
          </button>

          <button onClick={downloadVCard} className={styles.qrButton}>
            Добавить в контакты
          </button>

          {/* Кнопки для WhatsApp и Telegram */}
          <button
            onClick={() =>
              window.open(
                `https://wa.me/${user.phone.replace(/[^0-9]/g, "")}`,
                "_blank"
              )
            }
            className={`${styles.qrButton} ${styles.messengerButton}`}
          >
            <MessageCircle size={16} className={styles.icon} />
            Написать в WhatsApp
          </button>

          <button
            onClick={() =>
              window.open(`https://t.me/${user.telegramUsername}`, "_blank")
            }
            className={`${styles.qrButton} ${styles.messengerButton}`}
          >
            <MessageCircle size={16} className={styles.icon} />
            Написать в Telegram
          </button>
        </div>

        {showQRCode && (
          <div className={styles.qrCodeContainer}>
            <QRCode value={vCard} size={256} />
          </div>
        )}
      </div>

      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowRequestModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-semibold text-white mb-4">
              Заявка на визитку
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Ваше ФИО
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg
                    border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Ваш телефон
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg
                    border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg
                  hover:bg-blue-500 transition-colors duration-200"
              >
                Отправить заявку
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
