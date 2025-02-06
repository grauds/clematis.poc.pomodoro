import React from 'react';
import fs from 'fs';

import { render } from '@testing-library/react';

const importIcon = async (path: string): Promise<React.JSX.Element> => {
  const module = await import(path);
  const Icon = module.default;
  return <Icon />;
};

function readIcons(path: string): [string, Promise<React.JSX.Element>][] {
  const absolutePath = `${__dirname}${path}`;
  return fs
    .readdirSync(absolutePath)
    .filter((file) => {
      return file.slice(-4) === '.tsx';
    })
    .map((file) => {
      return [file, importIcon(`${absolutePath}${file}`)];
    });
}

describe('icons', () => {
  test.each(readIcons('/../'))(
    '%s',
    (_name: string, Icon: Promise<React.JSX.Element>) => {
      Icon.then((Result) => {
        expect(render(Result)).toMatchSnapshot();
      });
    },
  );
});
