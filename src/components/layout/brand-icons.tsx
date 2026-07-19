/**
 * Inline brand SVG icons.
 *
 * lucide-react dropped all brand/logo icons (YouTube, Twitter/X, Instagram,
 * Facebook, …) in v1. Rather than pin an old lucide version or add a second
 * icon dependency, we ship minimal inline SVGs for the social links here.
 * Each accepts standard SVG props so it drops into existing icon slots.
 */

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function YoutubeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.656l-5.214-6.817-5.966 6.817H1.683l7.73-8.835L1.254 2.25h6.82l4.713 6.231 5.457-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M24 12a12 12 0 1 0-13.875 11.854v-8.385H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.47h-2.796v8.384A12.001 12.001 0 0 0 24 12Z" />
    </svg>
  );
}

export function WhatsappIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.29 1.977 13.811.954 11.99.954c-5.439 0-9.865 4.37-9.87 9.8-.002 1.758.459 3.473 1.336 4.972l-.999 3.648 3.75-.972-2.16 2.215zm13.16-5.83c-.22-.11-1.3-.64-1.502-.713-.203-.075-.35-.112-.497.11-.147.22-.57.714-.698.86-.129.147-.258.165-.478.055-.22-.11-.929-.342-1.77-1.094-.653-.583-1.093-1.303-1.221-1.522-.129-.22-.014-.339.096-.448.1-.1.22-.257.33-.385.11-.129.147-.22.22-.367.073-.147.037-.275-.018-.385-.055-.11-.497-1.199-.68-1.642-.18-.433-.377-.375-.515-.382-.132-.007-.285-.008-.437-.008-.152 0-.4-.057-.61.165-.21.22-.8.78-.8.1 .9 2.01 2.02 .19 2.11 2.76 3.99 4.14 4.09 .22 .13 .29 .18 .44 .13 .15 -.05 1.09 -.45 1.24 -.86 .15 -.41 .15 -.76 .11 -.83 -.04 -.07 -.15 -.11 -.37 -.22z"/>
    </svg>
  );
}
