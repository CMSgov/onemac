import React from "react";
import { Link } from "@material-ui/core";
import { FieldHint } from "cmscommonlib";
import { Review } from "@cmsgov/design-system";
import { Message } from "../libs/formLib";

/**
 * Returns the ID specific form element
 */
const ComponentId: React.FC<{
  idPrefix?: string;
  idLabel: string;
  idFieldHint: FieldHint[];
  idFAQLink?: string;
  idSize?: string;
  statusMessages: Message[];
  prefill?: string;
  postPendId?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}> = ({
  idPrefix = "", //default prefix to empty string
  idLabel,
  idFieldHint,
  idFAQLink,
  idSize = "full",
  statusMessages,
  prefill,
  postPendId,
  value,
  onChange,
  disabled,
}) => {
  return (
    <>
      {!disabled && (
        <>
          <div className="label-container">
            <label htmlFor={idPrefix + "componentId"} className="required">
              {idLabel}
            </label>
            {idFAQLink && (
              <div className="label-rcol">
                <Link target="new" href={idFAQLink}>
                  What is my {idLabel}?
                </Link>
              </div>
            )}
          </div>
          {idFieldHint?.map(function (idFieldHint, idx) {
            return (
              <p
                id={idPrefix + "fieldHint" + idx}
                key={"fieldHint" + idx}
                className={idFieldHint.className || "field-hint"}
              >
                {idFieldHint.text}
              </p>
            );
          })}
          {statusMessages &&
            statusMessages.length > 0 &&
            statusMessages.map((message, i) => (
              <div
                key={i}
                id={idPrefix + "componentIdStatusMsg" + i}
                className={"ds-u-color--" + message.statusLevel}
              >
                {message.statusMessage}
              </div>
            ))}
          <div className="all-id">
            {prefill && <span className="prefill-id">{prefill}</span>}
            <input
              className={"field-" + idSize}
              type="text"
              id={idPrefix + "componentId"}
              name="componentId"
              aria-describedby={idFieldHint
                ?.map(function (idFieldHint, idx) {
                  return idPrefix + "fieldHint" + idx;
                })
                .join(" ")}
              value={value}
              onChange={onChange}
              required
              disabled={disabled}
            ></input>
            {postPendId && <span className="post-pend-id">{postPendId}</span>}
          </div>
        </>
      )}
      {disabled && <Review heading={idLabel}>{value}</Review>}
    </>
  );
};

export default ComponentId;
