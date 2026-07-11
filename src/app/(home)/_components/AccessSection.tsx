import styles from './AccessSection.module.css';

const address = '愛知県常滑市栄町6丁目166';
const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
  address,
)}&hl=ja&z=16&output=embed`;
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  address,
)}`;

export default function AccessSection() {
  return (
    <section id="access" className={styles.access}>
      <div className={styles.container}>
        <div className={styles.mapWrap}>
          <iframe
            className={styles.map}
            src={mapEmbedUrl}
            title="茶舗 和合 周辺の地図"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <div className={styles.info}>
          <p className={styles.name}>茶舗 和合</p>
          <div className={styles.address}>
            <p>愛知県常滑市栄町6丁目166</p>
            <p>名鉄常滑駅から徒歩15分</p>
          </div>
          <p className={styles.tel}>050-0000-0000</p>
          <a
            className={styles.mapButton}
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Google mapへ
          </a>
        </div>
      </div>
    </section>
  );
}
