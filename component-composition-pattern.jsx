export default function Tabs({ children, buttons, ButtonsContainer = "ul" }) {
  return (
    <>
      <ButtonsContainer>{buttons}</ButtonsContainer>
      {children}
    </>
  );
}

// HOW TO USE:

<Tabs
  buttons={
    <>
      <TabButton
        isSelected={selectedTopic === "components"}
        onClick={() => handleSelect("components")}
      >
        Components
      </TabButton>
      <TabButton
        isSelected={selectedTopic === "jsx"}
        onClick={() => handleSelect("jsx")}
      >
        JSX
      </TabButton>
      <TabButton
        isSelected={selectedTopic === "props"}
        onClick={() => handleSelect("props")}
      >
        Props
      </TabButton>
      <TabButton
        isSelected={selectedTopic === "state"}
        onClick={() => handleSelect("state")}
      >
        State
      </TabButton>
    </>
  }
>
  {tabContent}
</Tabs>;
