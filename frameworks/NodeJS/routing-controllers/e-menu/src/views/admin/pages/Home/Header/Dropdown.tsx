import React from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { observer } from "mobx-react";

import UserStore from "stores/UserStore";

import userIcon from "../../../assets/avatars/user.svg";

const Dropdown = () => (
  <CDropdown inNav className="c-header-nav-items mx-2">
    <CDropdownToggle className="c-header-nav-link" caret={false}>
      <span className="mr-3">{UserStore.fullName}</span>
      <div className="c-avatar">
        <CImg
          src={userIcon}
          className="c-avatar-img"
          alt="admin@bootstrapmaster.com"
        />
      </div>
    </CDropdownToggle>
    <CDropdownMenu className="pt-0" placement="bottom-end">
      <CDropdownItem>
        <CIcon name="cil-user" className="mfe-2" />
        Профіль
      </CDropdownItem>
      <CDropdownItem>
        <CIcon name="cil-settings" className="mfe-2" />
        Налаштування
      </CDropdownItem>

      <CDropdownItem divider />
      <CDropdownItem onClick={() => UserStore.signOut()}>
        <CIcon name="cil-lock-locked" className="mfe-2" />
        Вийти
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
);

export default observer(Dropdown);
