// Copyright © 2025 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { useComponents, useOryFlow } from "../../context"
import { OryForm } from "../form"
import { Node } from "../form/nodes/node"
import { OryCard } from "./card"
import { OryCardContent } from "./content"
import { OryCardFooter } from "./footer"
import { OryCardHeader } from "./header"

export function OryConsentCard() {
  const { Form, Card } = useComponents()
  const flow = useOryFlow()
  return (
    <OryCard>
      <OryCardHeader />
      <OryCardContent>
        <OryForm>
          <Card.Divider />
          <Form.Group>
            {flow.flow.ui.nodes.map((node, k) => (
              <Node key={k} node={node} />
            ))}
          </Form.Group>
          <Card.Divider />
          <OryCardFooter />
        </OryForm>
      </OryCardContent>
    </OryCard>
  )
}
