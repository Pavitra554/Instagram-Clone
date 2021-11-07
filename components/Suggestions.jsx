import React, { useEffect, useState } from "react";
import styles from "./styles/Suggestions.module.css";
import Image from "next/image";
import faker from "faker";

function Suggestions() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const suggestion =  [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setData(suggestion);
  }, []);
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div>Suggestions for you</div>
        <button>See All</button>
      </div>

      {data.map((user) => {
        return (
          <div key={user.id} className={styles.MiniProfileMain}>
            <div className={styles.profilewrap}>
              <div className={styles.userProfile}>
                <Image src={user.avatar} height={32} width={32} alt="user image" />
              </div>
              <div className={styles.namesection}>
                <h4 className={styles.userId}>{user.username}</h4>
                <div className={styles.username}>{user.name}</div>
              </div>
            </div>
            <button className={styles.follow}>Follow</button>
          </div>
        );
      })}
      <div className={styles.About}>
        <p>About · Help · Press · API · Jobs · Privacy · Terms · Locations · <br /> Top accounts · Hashtags · Language
        </p>
        <p>
            © 2021 INSTAGRAM FROM META
        </p>
      </div>
    </div>
  );
}

export default Suggestions;
