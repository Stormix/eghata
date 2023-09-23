import { ReactComponent as NavCenter } from '@/assets/nav-center.svg';

interface Props {
  className?: string;
}

const NavbarBackground = ({ className }: Props) => {
  return (
    <div className={className}>
      <div className=" h-full flex-1 navbar-shadow bg-white rounded-l-[40px]" />
      <NavCenter className="z-50" />
      <div className=" h-full flex-1  navbar-shadow bg-white rounded-r-[40px] -ml-1" />
    </div>
  );
};

export default NavbarBackground;
