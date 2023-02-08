import React, { lazy, memo } from "react";
import { PrerenderedComponent } from "react-prerendered-component";

const prefetchMap = new WeakMap();

const prefetchLazy = (LazyComponent) => {
  if (!prefetchMap.has(LazyComponent)) {
    prefetchMap.set(LazyComponent, LazyComponent._ctor());
  }
  return prefetchMap.get(LazyComponent);
};

const staticLazy = (dynamicImport: any) => {
  const LazyComponent = lazy(dynamicImport);

  return memo((props) => (
    <PrerenderedComponent live={prefetchLazy(LazyComponent)}>
      <LazyComponent {...props} />
    </PrerenderedComponent>
  ));
};

export default staticLazy;
