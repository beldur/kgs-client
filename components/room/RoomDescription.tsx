import classNames from 'classnames'

import { TextWithLinks } from './TextWithLinks'

export interface RoomDescriptionProps {
  text: string
}

export const RoomDescription = ({ text }: RoomDescriptionProps) => {
  const lines = text.split('\n')

  return (
    <div>
      {lines.map((line, lineNumber) => {
        if (line.length === 0) return <br key={lineNumber} />

        return (
          <p
            key={lineNumber}
            className={classNames({ 'font-bold': lineNumber === 0 })}
          >
            <TextWithLinks text={line} />
          </p>
        )
      })}
    </div>
  )
}
