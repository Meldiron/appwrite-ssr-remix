import { Fragment, useState } from "react";
import { AppwriteService } from "~/AppwriteService";

export default function Card(props: any) {
  const isCsr = props.isCsr;

  const [account, setAccount] = useState<undefined | null | true | any>(
    props.account
  );

  async function fetchAccount() {
    setAccount(true);

    try {
      setAccount(await AppwriteService.getAccount());
    } catch (err: any) {
      setAccount(null);
    }
  }

  let messageElement = null;

  if (account === undefined) {
    messageElement = <Fragment>Not Fetched Yet.</Fragment>;
  } else if (account === null) {
    messageElement = <Fragment>You are not signed in.</Fragment>;
  } else if (account === true) {
    messageElement = <Fragment>Fetching Account...</Fragment>;
  } else {
    messageElement = (
      <Fragment>
        Welcome{" "}
        <code className="u-un-break-text inline-code">{account.$id}</code>
      </Fragment>
    );
  }
  return (
    <div
      className={`card ${
        account === undefined || account === true
          ? "card-is-pending"
          : account === null
          ? "card-is-failed"
          : "card-is-complete"
      }`}
    >
      <div className="u-flex u-main-space-between u-cross-center">
        <div className="">
          <div className="eyebrow-heading-3">
            {isCsr ? "Client" : "Server"} Side
          </div>
        </div>

        <div
          style={{
            opacity: isCsr ? "100%" : "0%",
          }}
        >
          <div className="status">
            <button onClick={fetchAccount} className="tag">
              <span className="text">Fetch</span>
            </button>
          </div>
        </div>
      </div>

      <h2 className="heading-level-6 u-margin-block-start-2">
        {messageElement}
      </h2>

      <div className="u-flex u-main-space-between u-cross-end u-margin-block-start-40">
        {account === undefined || account === true || account === null ? (
          <div
            style={
              {
                "--p-avatar-border-color": "var(--color-neutral-120)",
              } as any
            }
            className="avatar is-color-empty"
          />
        ) : (
          <div className="avatar">
            <img
              src={AppwriteService.getAccountPicture(account.$id)}
              alt="Avatar"
            />
          </div>
        )}
        <div
          className={`status ${
            account === undefined || account === true
              ? "is-pending"
              : account === null
              ? "is-failed"
              : "is-complete"
          }`}
        >
          <span className="status-icon" />
        </div>
      </div>
    </div>
  );
}
