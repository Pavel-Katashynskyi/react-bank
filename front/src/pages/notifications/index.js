import React, { useState } from "react";

import Page from "../../component/page";
import BackButton from "../../component/back-button";

import "./index.css";

import Notification from "../../component/notification";

import Box from "../../component/box";

import { useAuth } from "../../utils/AuthContext";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  const auth = useAuth();
  const { userData } = auth || {};

  React.useEffect(() => {
    const fetchNotifications = async () => {
      const res = await fetch(
        `http://localhost:4000/notifications/?email=${userData.email}`
      );
      const data = await res.json();

      if (res.ok) {
        setNotifications(data.notifications.slice(0, 7));
      }
    };

    fetchNotifications();
  }, []);

  return (
    <Page style={{ backgroundColor: "#F5F5F7" }}>
      <BackButton />
      <div className="settings__title">
        <h2>Notifications</h2>
      </div>

      <div className="settings__form">
        <ul className="transactions notifications__list">
          {notifications &&
            notifications.map((notification) => (
              <li key={notification.id}>
                <Box>
                  <Notification
                    time={notification.time}
                    type={notification.type}
                  />
                </Box>
              </li>
            ))}
        </ul>
      </div>
    </Page>
  );
};

export default NotificationsPage;
