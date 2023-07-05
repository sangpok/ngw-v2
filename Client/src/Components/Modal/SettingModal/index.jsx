import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StyledSettingModal } from './styled';

import Modal from '../index';
import InformationTab from './InformationTab';
import UserTab from './UserTab';

const { TabWrapper, Tab, TabItem, TabContent } = StyledSettingModal;

import { closeModal } from '@Store/ModalSlice';
import { setUserData } from '@Store/UserAuthSlice';

const tabList = [
  {
    id: 0,
    name: '유저',
    component: ({ inputValues, onChange }) => (
      <UserTab inputValues={inputValues} onChange={onChange} />
    ),
  },
  {
    id: 1,
    name: '정보',
    component: () => <InformationTab />,
  },
];

const SettingModal = () => {
  const storeDispatch = useDispatch();

  const { modalTitle } = useSelector((state) => state.ModalSlice);
  const userData = useSelector((state) => state.UserAuthSlice);

  const [inputValues, setInputValues] = useState({ ...userData });

  const [selectedTabId, setSelectedTabId] = useState(0);
  // const changeUserData = useRef(null);

  const handleSubmit = () => {
    storeDispatch(setUserData({ ...inputValues }));
    storeDispatch(closeModal());
  };

  const handleCancel = () => {
    storeDispatch(closeModal());
  };

  return (
    <Modal title={modalTitle} onCancel={handleCancel} onSubmit={handleSubmit}>
      <TabWrapper>
        <Tab>
          {tabList.map((tab) => (
            <TabItem
              key={tab.id}
              selected={selectedTabId === tab.id}
              onClick={() => setSelectedTabId(tab.id)}
            >
              {tab.name}
            </TabItem>
          ))}
        </Tab>
        <TabContent>
          {tabList[selectedTabId].component({ inputValues, onChange: setInputValues })}
        </TabContent>
      </TabWrapper>
    </Modal>
  );
};

export default SettingModal;
