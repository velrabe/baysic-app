import { Link } from 'react-router-dom';
import PhoneFrame from '../../../ui/PhoneFrame/PhoneFrame';
import Section from '../../../ui/Section/Section';
import Button from '../../../ui/Button/Button';
import { parentTabs } from '../../../data/screenContent';
import styles from './TasksShared.module.css';

export default function TaskListNoChild() {
  return (
    <PhoneFrame bottomNav={parentTabs}>
      <div className={styles.screen}>
        <Section title="Задания" subtitle="Добавьте ребенка, чтобы создавать и отслеживать задачи." />
        <Button to="/parent/add-child-intro">Добавить ребенка</Button>
      </div>
    </PhoneFrame>
  );
}
