import { cva } from 'class-variance-authority';

export const menuItemVariants = cva('flex items-center w-full no-underline transition-colors duration-200', {
  variants: {
    variant: {
      default:
        'py-3 px-4 mx-3 my-1 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5',
      child:
        'py-3 pl-6 pr-4 my-1 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5',
      floating: 'py-2 px-4 my-1 rounded-md text-zinc-700 dark:text-zinc-300 hover:bg-slate-700/70',
      'icon-only':
        'justify-center w-12 h-12 mx-auto my-2 rounded-xl hover:bg-black/10 dark:hover:bg-slate-700',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
