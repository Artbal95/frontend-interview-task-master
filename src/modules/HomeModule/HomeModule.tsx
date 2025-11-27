import { FC } from "react";
import { useNavigate } from "react-router";

import RoutesEnum from "@shared/enums/routes";
import Button from "@shared/components/Button";

import styles from "./HomeModule.module.css";

const HomeModule: FC = () => {
  const navigate = useNavigate();

  const handleNavigateToChart = (): void => {
    navigate(RoutesEnum.CHART);
  };

  return (
    <div className={styles.HomeModule}>
      <h1>Welcome to Test Chart</h1>
      <Button onClick={handleNavigateToChart}>Go to Chart</Button>
    </div>
  );
};

export default HomeModule;
