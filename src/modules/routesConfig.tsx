export interface NavItemProps {
  id: string;
  messageId: string;
  title: string;
  icon?: string;
  exact?: boolean;
  url?: string;
  as?: string;
  type?: string;
  count?: number;
  color?: string;
  auth?: string[];
  children?: NavItemProps[] | NavItemProps;
}

const routesConfig: NavItemProps[] = [
  {
    id: `entidades`,
    title: `Entidades`,
    messageId: `sidebar.entidades`,
    type: `item`,
    url: `/entidades`,
    icon: `dashboard`,
  },
];
export default routesConfig;
