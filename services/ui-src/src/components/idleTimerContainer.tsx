import React, { useState, useEffect } from "react";
import { useIdleTimer, IIdleTimer } from "react-idle-timer";
import jwt_decode from "jwt-decode";
import { logout } from "../libs/logoutLib";
import { useAppContext } from "../libs/contextLib";

interface idleTimerProps {
  isAuthenticated: boolean;
}

const IdleTimerContainer = () => {
  const STORAGE_KEY: string = "accessToken";
  const TOTAL_TIMEOUT_TIME: number = 60 * 60 * 1000; // default of 1 hour total
  const PROMPT_TIME: number = 45 * 60 * 1000; // default of 45 minutes to warning
  const LOGOUT_TIME: number = TOTAL_TIMEOUT_TIME - PROMPT_TIME; // default logout 15 minutes after warning

  const { isAuthenticated, isLoggedInAsDeveloper } = useAppContext() ?? {};
  const [promptTimeout, setPromptTimeout] = useState(PROMPT_TIME);
  const [logoutTimeout, setLogoutTimeout] = useState(LOGOUT_TIME);

  const onPrompt = () => {
    console.log("prompt is opened");
  };

  const onIdle = () => {
    logout(isLoggedInAsDeveloper);
  };

  const idleTimer: IIdleTimer = useIdleTimer({
    onPrompt,
    onIdle,
    timeout: promptTimeout,
    promptTimeout: logoutTimeout,
    events: [],
    element: document,
    startOnMount: false,
    startManually: true,
    stopOnIdle: true,
    crossTab: true,
    syncTimers: 0,
    leaderElection: true,
  });

  useEffect(() => {
    setTimeoutTimes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const setTimeoutTimes = () => {
    const tokenKey: string[] = Object.keys(localStorage).filter((k) =>
      k.includes(STORAGE_KEY)
    );
    const loginToken: string | null =
      tokenKey && localStorage.getItem(tokenKey[0]);
    if (!loginToken) return;

    const decodedToken: any = jwt_decode(loginToken);
    const epochAuthTime: number | undefined = decodedToken?.auth_time;
    if (!epochAuthTime) return;

    const authTime: number = new Date(epochAuthTime * 1000).valueOf();
    const currentTime: number = new Date().valueOf();
    const timeLoggedIn: number = currentTime - authTime; // in milliseconds
    const timeLeft: number = TOTAL_TIMEOUT_TIME - timeLoggedIn;

    // time has already expired for this session
    if (timeLeft <= 0) {
      // Note: possibly add logic to handle edge cases?
      return;
    }

    // time is already less then the prompt time - inform user they are low on time
    if (timeLeft <= LOGOUT_TIME) {
      setPromptTimeout(0);
      setLogoutTimeout(timeLeft);
      idleTimer.start();
      onPrompt();
      return;
    }

    setPromptTimeout(PROMPT_TIME - timeLoggedIn);
    idleTimer.start();
  };

  return <></>;
};

export default IdleTimerContainer;
