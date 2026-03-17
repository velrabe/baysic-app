import { useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { navigation } from '../../data/navigation';
import styles from './Sidebar.module.css';

function ScreenGroup({ item, isOpen, onToggle }) {
  const mainItem = item.items[0];
  const alternativeItems = item.items.slice(1);
  const hasAlternatives = alternativeItems.length > 0;

  return (
    <div className={styles.screenGroup}>
      <div className={styles.screenGroupHeader}>
        <NavLink
          to={mainItem.path}
          className={({ isActive }) => `${styles.link} ${styles.mainLink} ${isActive ? styles.active : ''}`}
        >
          {item.label}
        </NavLink>
        {hasAlternatives ? (
          <button
            type="button"
            className={`${styles.toggle} ${isOpen ? styles.toggleOpen : ''}`}
            onClick={onToggle}
            aria-label={`Показать альтернативные состояния для ${item.label}`}
          >
            ▾
          </button>
        ) : null}
      </div>
      {hasAlternatives && isOpen ? (
        <div className={styles.stateList}>
          {alternativeItems.map((child) => (
            <NavLink
              key={child.id}
              to={child.path}
              className={({ isActive }) => `${styles.link} ${styles.stateLink} ${isActive ? styles.active : ''}`}
            >
              {child.title}
            </NavLink>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function NavigationNode({ item, currentPath, level = 0, openGroupKey, onGroupToggle, collapsedSections = new Set(), onSectionToggle = () => {} }) {
  if (item.items && item.items.every((child) => child.path)) {
    const mainItem = item.items[0];
    const groupKey = mainItem.path;
    const isOpen = openGroupKey === groupKey;

    return (
      <ScreenGroup
        item={item}
        isOpen={isOpen}
        onToggle={() => onGroupToggle(groupKey)}
      />
    );
  }

  if (item.items) {
    const isTopLevel = level === 0;
    const sectionKey = `section-${item.label}`;
    const isCollapsed = isTopLevel && collapsedSections.has(sectionKey);

    const LabelTag = isTopLevel ? 'button' : 'div';
    return (
      <div className={styles.group}>
        <LabelTag
          type={isTopLevel ? 'button' : undefined}
          className={`${styles.groupLabel} ${level > 0 ? styles.nestedLabel : ''} ${isTopLevel ? styles.groupLabelCollapsible : ''}`}
          onClick={isTopLevel ? () => onSectionToggle(sectionKey) : undefined}
          aria-expanded={isTopLevel ? !isCollapsed : undefined}
        >
          {isTopLevel && (
            <span className={styles.groupToggle} aria-hidden="true">
              {isCollapsed ? '▸' : '▾'}
            </span>
          )}
          {item.label}
        </LabelTag>
        {!isCollapsed && (
          <div className={styles.groupItems}>
            {item.items.map((child) => (
              <NavigationNode
                key={child.id || child.label}
                item={child}
                currentPath={currentPath}
                level={level + 1}
                openGroupKey={openGroupKey}
                onGroupToggle={onGroupToggle}
                collapsedSections={collapsedSections}
                onSectionToggle={onSectionToggle}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
    >
      {item.title}
    </NavLink>
  );
}

export default function Sidebar() {
  const location = useLocation();
  const sections = useMemo(() => navigation, []);
  const [openGroupKey, setOpenGroupKey] = useState(null);
  const [collapsedSections, setCollapsedSections] = useState(() =>
    new Set(navigation.map((s) => `section-${s.label}`))
  );

  const handleSectionToggle = (sectionKey) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionKey)) {
        next.delete(sectionKey);
      } else {
        next.add(sectionKey);
      }
      return next;
    });
  };

  useEffect(() => {
    const findGroupKeyForPath = (items, path) => {
      for (const item of items) {
        if (item.items && item.items.every((child) => child.path)) {
          const mainItem = item.items[0];
          const groupKey = mainItem.path;
          if (item.items.some((child) => child.path === path)) {
            return groupKey;
          }
        }

        if (item.items) {
          const nested = findGroupKeyForPath(item.items, path);
          if (nested) return nested;
        }
      }
      return null;
    };

    const nextKey = findGroupKeyForPath(sections, location.pathname);
    setOpenGroupKey(nextKey);
  }, [location.pathname, sections]);

  const handleGroupToggle = (groupKey) => {
    setOpenGroupKey((current) => (current === groupKey ? null : groupKey));
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h1 className={styles.title}>Прототип Baysic</h1>
        <p className={styles.subtitle}>Сценарии и состояния экранов</p>
      </div>
      <div className={styles.tree}>
        {sections.map((section) => (
          <NavigationNode
            key={section.label}
            item={section}
            currentPath={location.pathname}
            level={0}
            openGroupKey={openGroupKey}
            onGroupToggle={handleGroupToggle}
            collapsedSections={collapsedSections}
            onSectionToggle={handleSectionToggle}
          />
        ))}
      </div>
    </aside>
  );
}
