import styles from "./ChatBox.module.css";

import moment from "moment";

import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import { useGetUser } from "../../hooks/user/useGetUser";
import { useFormatDate } from "../../hooks/utils/useFormatDate";

import { setError } from "../../features/alertSlice";
import { useDispatch, useSelector } from "react-redux";

import Message from "./Message";
import NotFound from "../error/NotFound";
import EmojiPicker from "emoji-picker-react";
import NameLogo from "../../components/avatar/NameAvatar";
import Loading from "../../components/loaders/loading/Loading";
import AnimatedButton from "../../components/buttons/AnimatedButton";
import images from "../../constants/images";
import Spinner from "../../components/loaders/spinner/Spinner";

export default function ChatBox({
  onlineUsers,
  sendMessage,
  messages,
  messagesLoading,
  handleSetReciever,
  handleUserMenuDisplay,
}) {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [rows, setRows] = useState(1);
  const [emoji, setEmoji] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);

  const [reciever, setReciever] = useState(null);

  const { getUser, isPending } = useGetUser();

  const { user: me } = useSelector((store) => store.auth);
  const { userName } = useParams();
  const { formatChatDate } = useFormatDate();

  const submitButtonRef = useRef(null);
  const scrollRef = useRef(null);
  const excludedElementRef = useRef(null);
  const nodeRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.shiftKey && e.key === "Enter") {
      return;
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (submitButtonRef) submitButtonRef.current.click();
    }
  };

  const groupMessages = (messages) => {
    const groups = {};

    messages.forEach((message) => {
      const date = moment(message.createdAt).format("DD-MM-YYYY");
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });

    return Object.entries(groups).sort(
      (a, b) => new Date(a[0]) - new Date(b[0])
    );
  };

  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current;
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleClick = (event) => {
      if (
        excludedElementRef.current &&
        excludedElementRef.current.contains(event.target)
      ) {
        return;
      }
      if (nodeRef.current && nodeRef.current.contains(event.target)) {
        return;
      }
      setEmoji(false);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      handleSetReciever(null);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchReciever = async () => {
      const res = await getUser(userName);
      if (res.ok) {
        setReciever(res.user);
        handleSetReciever(res.user);
      } else if (res.error) {
        dispatch(setError(res.error.message));
        if (res.error.status === 404) {
          setShowNotFound(true);
        }
      }
    };
    fetchReciever();
    // eslint-disable-next-line
  }, [userName]);

  useEffect(() => {
    if (isPending || reciever || messagesLoading) {
      handleUserMenuDisplay(true);
    } else {
      handleUserMenuDisplay(false);
    }
    return () => {
      handleUserMenuDisplay(false);
    };
  }, [isPending, reciever, messagesLoading]);

  const handleSend = () => {
    sendMessage(message);
    setMessage("");
    setRows(1);
  };

  const containerStyle = {
    backgroundImage: `url(${images.chatBg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
  };

  return (
    <div className={styles["chatbox"]}>
      {reciever ? (
        <>
          <div className={styles["upperSection"]} style={containerStyle}>
            <div className={styles["recieverName"]}>
              {reciever.avatar ? (
                <img
                  src={`data:image/jpeg;base64, ${reciever.avatar}`}
                  alt="user-avatar"
                  className={styles["user-avatar"]}
                />
              ) : (
                <NameLogo
                  logoStyle={{
                    width: "1.7rem",
                    height: "2.6rem",
                    fontSize: "1.6rem",
                  }}
                  name={reciever.name}
                />
              )}
              <div>{reciever.name}</div>
              {onlineUsers.includes(reciever._id) ? (
                <span className={styles["online"]}>Online</span>
              ) : (
                <span className={styles["offline"]}>Offline</span>
              )}
            </div>
            <div className={styles["chatContainer"]} ref={scrollRef}>
              {!isPending &&
                !messagesLoading &&
                messages &&
                groupMessages(messages).map((grp, index) => (
                  <div key={index}>
                    <div className={styles["dateContainer"]}>
                      <div className={styles["date"]}>
                        {formatChatDate(grp[0], "DD-MM-YYYY")}
                      </div>
                    </div>

                    <div className={styles["messageContainer"]}>
                      {grp[1].map((msg, msgIndex) => (
                        <Message
                          key={msgIndex}
                          message={msg}
                          type={
                            msg.sender === me._id
                              ? "sent-message"
                              : "received-message"
                          }
                        />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className={styles["lowerSection"]}>
            <div
              className={styles["emoji"]}
              onClick={() => setEmoji((prev) => !prev)}
              ref={excludedElementRef}
            >
              😀
            </div>
            <div className={styles["ls-1"]}>
              <CSSTransition
                in={emoji}
                timeout={300}
                nodeRef={nodeRef}
                classNames="moveup"
                unmountOnExit
              >
                <div className={styles["emojiPicker"]} ref={nodeRef}>
                  <EmojiPicker
                    theme="dark"
                    onEmojiClick={(emoji) =>
                      setMessage((prev) => prev + emoji.emoji)
                    }
                  />
                </div>
              </CSSTransition>
              <textarea
                rows={rows}
                onKeyDown={handleKeyPress}
                onChange={(e) => {
                  const numberOfRows =
                    (e.target.value.match(/\n/g) || []).length + 1;
                  setRows(Math.min(5, numberOfRows));
                  setMessage(e.target.value);
                }}
                style={{
                  ...(message === "" && { width: "calc(100% - 9rem)" }),
                }}
                value={message}
                placeholder={"Type your Message"}
                className={styles["chatInput"]}
                required
              />
            </div>
            {message === "" ? null : (
              <div className={styles["ls-2"]}>
                <AnimatedButton
                  buttonRef={submitButtonRef}
                  icon={<i className="fa-solid fa-paper-plane"></i>}
                  disabled={message === ""}
                  buttonStyle={{
                    fontSize: "1.8rem",
                    padding: "0.4rem 0.4rem",
                    width: "3rem",
                    textAlign: "center",
                    borderRadius: "50%",
                    backgroundColor: "#05010c",
                    border: "2px solid rgb(50, 178, 11)",
                  }}
                  type="createBt"
                  action={handleSend}
                />
              </div>
            )}
          </div>
        </>
      ) : null}
      {(isPending || messagesLoading) && (
        <div className={styles.loading}>
          <Spinner spinnerStyles={{ width: "4rem", height: "4rem" }} />
        </div>
      )}
      {showNotFound && <NotFound />}
    </div>
  );
}
