import { cva } from 'class-variance-authority';

export const menuItemVariants = cva('flex items-center w-full no-underline transition-colors duration-200', {
  variants: {
    variant: {
      default:
        'py-3 px-4 mx-3 my-1 rounded-lg text-foreground hover:bg-muted',
      child:
        'py-3 pl-6 pr-4 my-1 rounded-lg text-muted-foreground hover:bg-muted',
      floating: 'py-2 px-4 my-1 rounded-md text-foreground hover:bg-muted',
      'icon-only':
        'justify-center w-12 h-12 mx-auto my-2 rounded-xl hover:bg-muted',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
