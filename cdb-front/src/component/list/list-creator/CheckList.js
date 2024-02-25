import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CheckList = ({ type, list, selectionChange }) => {
  const [isVisibleMid, setIsVisibleMid] = useState(true);
  const [visibleBots, setVisibleBots] = useState({});
  const [selectedTop, setSelectedTop] = useState(false);
  const [selectedMid, setSelectedMid] = useState([]);
  const [selectedBot, setSelectedBot] = useState([]);

  useEffect(() => {
    // type에 따라 선택된 항목 전달
    if (type === "단원" || type === "연도") {
      selectionChange(selectedBot);
    } else {
      selectionChange(selectedMid);
    }
  }, [selectedMid, selectedBot]);

  const toggleMidVisibility = () => {
    setIsVisibleMid(!isVisibleMid);
  };

  const toggleBotVisibility = (midId) => {
    setVisibleBots((prev) => ({ ...prev, [midId]: !prev[midId] }));
  };

  // Handle top checkbox change
  const handleTopCheckboxChange = () => {
    if (!selectedTop) {
      setSelectedMid(list.map((item) => item.id));
      setSelectedBot(
        list.flatMap((item) => (item.bot ? item.bot.map((bot) => bot.id) : []))
      );
    } else {
      setSelectedMid([]);
      setSelectedBot([]);
    }
    setSelectedTop(!selectedTop);
  };

  // Handle mid checkbox change
  const handleMidCheckboxChange = (midId) => {
    const newSelectedMid = selectedMid.includes(midId)
      ? selectedMid.filter((id) => id !== midId)
      : [...selectedMid, midId];
    setSelectedMid(newSelectedMid);

    const notCheckedList = list.filter(
      (item) => !newSelectedMid.includes(item.id)
    );
    if (newSelectedMid.includes(midId)) {
      setVisibleBots({ ...visibleBots, [midId]: true });
      notCheckedList.forEach((item) => {
        if (
          !item.bot?.map((bot) => bot.id).some((id) => selectedBot.includes(id))
        ) {
          setVisibleBots((prev) => ({ ...prev, [item.id]: false }));
        }
      });
    }

    const foundItem = list.find((item) => item.id === midId);
    const newSelectedBot =
      foundItem && foundItem.bot ? foundItem.bot.map((bot) => bot.id) : [];

    if (!selectedMid.includes(midId)) {
      // Add new bots if midId is not already selected
      setSelectedBot((prevBots) => [
        ...new Set([...prevBots, ...newSelectedBot]),
      ]);
    } else {
      // Remove bots related to the deselected midId
      setSelectedBot((prevBots) =>
        prevBots.filter((id) => !newSelectedBot.includes(id))
      );
    }

    // Update the top-level checkbox based on the current state of mid-level selections
    setSelectedTop(newSelectedMid.length === list.length);
  };

  // Handle bot checkbox change
  const handleBotCheckboxChange = (midId, botId) => {
    const newSelectedBot = selectedBot.includes(botId)
      ? selectedBot.filter((id) => id !== botId)
      : [...selectedBot, botId];
    setSelectedBot(newSelectedBot);

    const isAllBotsSelected = list
      .find((item) => item.id === midId)
      .bot.every((bot) => newSelectedBot.includes(bot.id));
    if (isAllBotsSelected) {
      setSelectedMid([...new Set([...selectedMid, midId])]);
    } else {
      setSelectedMid(selectedMid.filter((id) => id !== midId));
    }

    const isAllMidSelected = list.every((item) =>
      item.bot.every((bot) => newSelectedBot.includes(bot.id))
    );
    setSelectedTop(isAllMidSelected);
  };

  return (
    <CheckListContainer>
      <CheckListTopContainer>
        <CheckboxGroup onClick={handleTopCheckboxChange}>
          <Checkbox checked={selectedTop} />
        </CheckboxGroup>
        <CheckItemTextBox onClick={handleTopCheckboxChange}>
          <CheckItemText>{type}</CheckItemText>
        </CheckItemTextBox>
        <CheckIconContainer onClick={toggleMidVisibility}>
          <CheckIcon>
            {isVisibleMid ? <CheckUpSvg /> : <CheckDownSvg />}
          </CheckIcon>
        </CheckIconContainer>
      </CheckListTopContainer>
      <CheckLine />
      {isVisibleMid && (
        <CheckListMiddleContainer>
          {list.map((midItem) => (
            <React.Fragment key={midItem.id}>
              <CheckListMiddleItem>
                <CheckboxGroup
                  onClick={() => handleMidCheckboxChange(midItem.id)}
                >
                  <Checkbox checked={selectedMid.includes(midItem.id)} />
                </CheckboxGroup>
                <CheckItemTextBox
                  onClick={() => handleMidCheckboxChange(midItem.id)}
                >
                  <CheckItemText>{midItem.name}</CheckItemText>
                </CheckItemTextBox>
                {midItem.bot && (
                  <CheckIconContainer
                    onClick={() => toggleBotVisibility(midItem.id)}
                  >
                    <CheckIcon>
                      {visibleBots[midItem.id] ? (
                        <CheckUpSvg />
                      ) : (
                        <CheckDownSvg />
                      )}
                    </CheckIcon>
                  </CheckIconContainer>
                )}
              </CheckListMiddleItem>
              {visibleBots[midItem.id] &&
                midItem.bot &&
                midItem.bot.map((botItem) => (
                  <CheckListBottomItem key={botItem.id}>
                    <CheckboxGroup
                      onClick={() =>
                        handleBotCheckboxChange(midItem.id, botItem.id)
                      }
                    >
                      <Checkbox checked={selectedBot.includes(botItem.id)} />
                    </CheckboxGroup>
                    <CheckItemTextBox
                      onClick={() =>
                        handleBotCheckboxChange(midItem.id, botItem.id)
                      }
                    >
                      <CheckItemText>{botItem.name}</CheckItemText>
                    </CheckItemTextBox>
                  </CheckListBottomItem>
                ))}
            </React.Fragment>
          ))}
        </CheckListMiddleContainer>
      )}
    </CheckListContainer>
  );
};

export default CheckList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 0.5rem;
  align-self: stretch;
`;

const CheckDescription = styled.div`
  display: flex;
  flex-direction: row;
  align-items: left;
`;

const CheckListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
`;

const CheckListTopContainer = styled.div`
  display: flex;
  padding: 0.75rem 1rem;
  align-items: center;
  gap: 0.75rem;
  align-self: stretch;
  border-bottom: 1px solid var(--Grayscale-200, #eff0f6);
  background: var(--Grayscale-000, #fff);
`;

const CheckboxGroup = styled.div`
  width: 1rem;
  height: 1rem;
`;

const Checkbox = ({ checked, onClick }) => {
  return (
    <CheckboxContainer onClick={onClick}>
      {checked ? (
        // 체크된 상태를 나타내는 SVG
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
        >
          <rect
            x="0.5"
            y="1"
            width="15"
            height="15"
            rx="1.5"
            fill="#4A90E2"
            stroke="#4A90E2"
          />
          <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="1.5" />
        </svg>
      ) : (
        // 체크되지 않은 상태를 나타내는 SVG
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
        >
          <rect
            x="0.5"
            y="1"
            width="15"
            height="15"
            rx="1.5"
            fill="white"
            stroke="#ABB5BE"
          />
        </svg>
      )}
    </CheckboxContainer>
  );
};

const CheckboxContainer = styled.div`
  cursor: pointer;
`;

const CheckItemTextBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  flex: 1 0 0;
  cursor: pointer;
`;

const CheckItemText = styled.div`
  color: var(--Grayscale-700, #170f49);

  /* Body1/Regular */
  font-family: "Pretendard Variable";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.01rem;
`;

const CheckIconContainer = styled.div`
  display: flex;
  width: 1.8125rem;
  height: 1.25rem;
  padding: 0rem 0.125rem 0rem 0.1875rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const CheckIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
`;

const CheckUpSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="21"
      viewBox="0 0 25 21"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.7317 15.3246C21.662 15.3944 21.5793 15.4498 21.4881 15.4877C21.397 15.5255 21.2993 15.5449 21.2007 15.5449C21.102 15.5449 21.0044 15.5255 20.9132 15.4877C20.8221 15.4498 20.7394 15.3944 20.6697 15.3246L12.2007 6.85408L3.73169 15.3246C3.66195 15.3943 3.57917 15.4496 3.48806 15.4874C3.39695 15.5251 3.2993 15.5445 3.20069 15.5445C3.10207 15.5445 3.00442 15.5251 2.91331 15.4874C2.8222 15.4496 2.73942 15.3943 2.66969 15.3246C2.59995 15.2548 2.54464 15.1721 2.5069 15.081C2.46916 14.9898 2.44974 14.8922 2.44974 14.7936C2.44974 14.695 2.46916 14.5973 2.5069 14.5062C2.54464 14.4151 2.59995 14.3323 2.66969 14.2626L11.6697 5.26258C11.7394 5.19274 11.8221 5.13732 11.9132 5.09951C12.0044 5.0617 12.102 5.04224 12.2007 5.04224C12.2993 5.04224 12.397 5.0617 12.4881 5.09951C12.5793 5.13732 12.662 5.19274 12.7317 5.26258L21.7317 14.2626C21.8015 14.3322 21.8569 14.415 21.8948 14.5061C21.9326 14.5972 21.952 14.6949 21.952 14.7936C21.952 14.8922 21.9326 14.9899 21.8948 15.081C21.8569 15.1721 21.8015 15.2549 21.7317 15.3246V15.3246Z"
        fill="black"
      />
    </svg>
  );
};

const CheckDownSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="20"
      viewBox="0 0 24 20"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.46888 4.96888C2.53854 4.89903 2.62131 4.84362 2.71243 4.80581C2.80354 4.768 2.90122 4.74854 2.99988 4.74854C3.09853 4.74854 3.19621 4.768 3.28733 4.80581C3.37844 4.84362 3.46121 4.89903 3.53088 4.96888L11.9999 13.4394L20.4689 4.96888C20.5386 4.89914 20.6214 4.84383 20.7125 4.80609C20.8036 4.76835 20.9013 4.74893 20.9999 4.74893C21.0985 4.74893 21.1961 4.76835 21.2873 4.80609C21.3784 4.84383 21.4611 4.89914 21.5309 4.96888C21.6006 5.03861 21.6559 5.12139 21.6937 5.2125C21.7314 5.30361 21.7508 5.40126 21.7508 5.49988C21.7508 5.59849 21.7314 5.69614 21.6937 5.78725C21.6559 5.87836 21.6006 5.96114 21.5309 6.03088L12.5309 15.0309C12.4612 15.1007 12.3784 15.1561 12.2873 15.1939C12.1962 15.2318 12.0985 15.2512 11.9999 15.2512C11.9012 15.2512 11.8035 15.2318 11.7124 15.1939C11.6213 15.1561 11.5385 15.1007 11.4689 15.0309L2.46888 6.03088C2.39903 5.96121 2.34362 5.87844 2.30581 5.78733C2.268 5.69621 2.24854 5.59853 2.24854 5.49988C2.24854 5.40122 2.268 5.30354 2.30581 5.21243C2.34362 5.12131 2.39903 5.03854 2.46888 4.96888V4.96888Z"
        fill="black"
      />
    </svg>
  );
};

const CheckLine = styled.div`
  width: 48.125rem;
  height: 0.0625rem;

  background: var(--Grayscale-700, #170f49);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CheckListMiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
`;

const CheckListMiddleItem = styled.div`
  display: flex;
  padding: 0.75rem 1rem 0.75rem 2.25rem;
  align-items: center;
  gap: 0.75rem;
  align-self: stretch;
  border-bottom: 1px solid var(--Grayscale-200, #eff0f6);
  background: var(--Grayscale-000, #fff);
`;

const CheckListBottomItem = styled.div`
  display: flex;
  padding: 0.75rem 4.5rem;
  align-items: center;
  gap: 0.75rem;
  align-self: stretch;
  border-bottom: 1px solid var(--Grayscale-200, #eff0f6);
  background: var(--Grayscale-000, #fff);
`;
