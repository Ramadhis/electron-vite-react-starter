import React from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import Content from "../../components/Content";
const MainSetting = () => {
  return (
    <Content title={`Settings`}>
      <div>
        <div className="mb-3">
          <div className="text-sm font-bold ">Backup sqlite db file</div>
          <button className="btn btn-primary mt-2">Backup now</button>
        </div>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Pick a sqlite db file</legend>
          <input type="file" className="file-input" />
          <label className="fieldset-label">Max size 50MB</label>
        </fieldset>
      </div>
    </Content>
  );
};

export default MainSetting;
