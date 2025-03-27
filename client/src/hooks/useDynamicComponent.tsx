import { ComponentType } from 'react';

export function useDynamicComponent<M extends Record<string, ComponentType<any>>>(componentMap: M) {
  return function DynamicComponent<Key extends keyof M>(
    props: { componentName: Key } & React.ComponentProps<M[Key]>
  ) {
    const { componentName, ...restProps } = props;
    const Component = componentMap[componentName];

    if (!Component) {
      console.error(`Component "${String(componentName)}" not found.`);
      return null;
    }

    return <Component {...(restProps as any)}/>;
  };
}
