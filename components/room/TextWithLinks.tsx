import { Fragment, useMemo } from 'react'

const URL_REGEX = /(http[s]?:\/\/[^\s]*)/i

export interface TextWithLinksProps {
  text: string
}

export const TextWithLinks = ({ text }: TextWithLinksProps) => {
  const output = useMemo(() => {
    const res = []
    let index = 0
    let match

    do {
      match = text.substring(index).match(URL_REGEX)

      if (match && typeof match.index !== 'undefined') {
        if (match.index - index > 0) {
          res.push(
            <Fragment key={index}>
              {text.substring(index, match.index)}
            </Fragment>,
          )
        }

        res.push(
          <a className="link" key={match.index} target="_blank">
            {match[0]}
          </a>,
        )
        index = match.index + match[0].length
      } else if (index < text.length) {
        res.push(<Fragment key={index}>{text.substring(index)}</Fragment>)
      }
    } while (match)

    return res
  }, [text])

  return output
}
