import { useEffect, useState } from "react";
import {
  ArrowLeftIcon,
  CaretDownIcon,
  CaretLeftIcon,
  CaretUpIcon,
  GearIcon,
} from "@phosphor-icons/react";
import TermsAndConditions from "../../../TermsAndConditions/TermsAndConditions";
import PrivacyPolicyContainer from "../../../PrivacyPolicyContainer/PrivacyPolicyContainer";
import AboutThisVersion from "../../../About/AboutThisVersion";
import About from "../../../About/About";
import ContactUs from "../../../ContactUs/ContactUs";
import { Helmet } from "react-helmet-async";

import "../../../../styles/settingsstyles.css";
const Settings = () => {
  const [selectedSubSetting, setSelectedSubSetting] = useState(null);
  const [settingsActive, setSettingsActive] = useState(null);

  const handleSettingsClicked = (e, settingName) => {
    e.preventDefault();
    setSettingsActive(settingName);
  };

  const handleSubSettingsClicked = (e, settingName) => {
    if (selectedSubSetting === settingName) {
      setSelectedSubSetting(null);
    } else {
      setSelectedSubSetting(settingName);
    }
  };
  return (
    <div
      style={{
        backgroundColor: "#fff",
        width: "100dvw",
        height: "100dvh",
        overflow: "auto",
        padding: "20px",
      }}
    >
      <Helmet>
        <title>Hotspots NZ - Settings</title>
        <meta name="description" content="Hotspots NZ settings" />
      </Helmet>

      {settingsActive === null ? (
        <h2 className="-display-flex-align-items-center -gap-5">
          <GearIcon weight="fill" color="#FA6737" /> Settings
        </h2>
      ) : (
        <h2
          onClick={() => {
            setSettingsActive(null);
            setSelectedSubSetting(null);
          }}
          className="-display-flex-align-items-center -gap-5"
        >
          <CaretLeftIcon color="#FA6737" /> Back
        </h2>
      )}

      {settingsActive === null && (
        <div>
          <ul className="settings__ul">
            <li
              style={{ borderBottom: "1px solid #ccc", paddingBottom: "10px" }}
            >
              <button
                className={`settings-ul-li__btn ${selectedSubSetting === "about" ? "activeSetting" : ""}`}
                onClick={(e) => handleSubSettingsClicked(e, "about")}
              >
                {selectedSubSetting === null ? (
                  <CaretDownIcon />
                ) : (
                  <CaretUpIcon />
                )}
                About
              </button>

              {/* sub-setting */}
              {selectedSubSetting === "about" && (
                <ul className="sub-settings__ul">
                  <li>
                    <button
                      onClick={(e) => handleSettingsClicked(e, "aboutus")}
                    >
                      About Us
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={(e) =>
                        handleSettingsClicked(e, "aboutthisversion")
                      }
                    >
                      About This Version
                    </button>
                  </li>
                </ul>
              )}
              {/* sub-setting */}
            </li>

            <li>
              <button
                className="settings-ul-li__btn"
                onClick={(e) => handleSettingsClicked(e, "terms&conditions")}
              >
                Terms & Conditions
              </button>
            </li>
            <li>
              <button
                className="settings-ul-li__btn"
                onClick={(e) => handleSettingsClicked(e, "privacypolicy")}
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button
                className="settings-ul-li__btn"
                onClick={(e) => handleSettingsClicked(e, "contactus")}
              >
                Contact Us
              </button>
            </li>
          </ul>
        </div>
      )}

      {settingsActive === "terms&conditions" && <TermsAndConditions />}
      {settingsActive === "privacypolicy" && <PrivacyPolicyContainer />}
      {settingsActive === "contactus" && <ContactUs />}
      {settingsActive === "aboutus" && <About />}
      {settingsActive === "aboutthisversion" && <AboutThisVersion />}
    </div>
  );
};

export default Settings;
