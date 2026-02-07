import { MouseEventHandler } from "react";
import { MovieSchema } from "../api/schemas";

export interface ButtonProps {
  className?: string;
  title?: string;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'medium' | 'large';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  ariaLabel?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  children?: React.ReactNode;
}

export interface LinkProps {
  href: string;
  className?: string;
  title?: string;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  isLoading?: boolean;
  isDisabled?: boolean;
  children?: React.ReactNode;
}


export interface Loaderprops {
  size: "small" | "medium" | "large";
}

export interface GenreCardProps {
  title: string;
  imageUrl: string;
  href: string;
}

export interface Field {
  key: number;
  id: string;
  type: 'email' | 'password' | 'text';
  icon?: string;
  placeholder?: string;
  required?: boolean;
}

export interface AuthFormProps {
  title?: string;
  fields: Field[];
  linkText: string;
  type: "login" | "register";
  onClose: () => void;
}

export interface MovieHeroProps {
  buttons: MovieHeroButton[];
  random: boolean;
  movieData?: MovieSchema;
  page?: "movie" | "main";
}

export interface MovieHeroButton {
  id: 'trailer' | 'details' | 'favorite' | 'refresh';
  text?: string;
  icon?: string;
  option: 'button' | 'link';
  variant: 'primary' | 'secondary';
  size: 'small' | 'medium' | 'large';
  ariaLabel?: string;
}

export interface MovieHeroButtonsProps {
  buttons: MovieHeroButton[];
  onRefresh: () => void;
  loading: boolean;
  movieData: MovieSchema;
}

export interface TrailerModalProps {
  videoUrl: string;
  videoTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export interface PofileAboutProps {
  name: string;
  surname: string;
  email: string;
  logout: () => void;
}