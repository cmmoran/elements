// Copyright © 2024 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { FlowType, UiNode, UiNodeGroupEnum } from "@ory/client-fetch"
import {
  LoginFlowContainer,
  RegistrationFlowContainer,
} from "../../util/flowContainer"

export function isChoosingMethod(
  flow: LoginFlowContainer | RegistrationFlowContainer,
): boolean {
  return (
    flow.flow.ui.nodes.some(
      (node) =>
        "name" in node.attributes &&
        node.attributes.name === "screen" &&
        "value" in node.attributes &&
        node.attributes.value === "previous",
    ) ||
    flow.flow.ui.nodes.some(
      (node) =>
        node.group === UiNodeGroupEnum.IdentifierFirst &&
        "name" in node.attributes &&
        node.attributes.name === "identifier" &&
        node.attributes.type === "hidden",
    ) ||
    (flow.flowType === FlowType.Login && flow.flow.requested_aal === "aal2")
  )
}

export function removeSsoNodes(nodes: UiNode[]): UiNode[] {
  return nodes.filter(
    (node) =>
      !(
        node.group === UiNodeGroupEnum.Oidc ||
        node.group === UiNodeGroupEnum.Saml
      ),
  )
}

export function getFinalNodes(
  uniqueGroups: Partial<Record<UiNodeGroupEnum, UiNode[]>>,
  selectedGroup: UiNodeGroupEnum | undefined,
): UiNode[] {
  const selectedNodes: UiNode[] = selectedGroup
    ? (uniqueGroups[selectedGroup] ?? [])
    : []

  return [
    ...(uniqueGroups?.identifier_first ?? []),
    ...(uniqueGroups?.default ?? []),
    ...(uniqueGroups?.captcha ?? []),
  ]
    .flat()
    .filter(
      (node) => "type" in node.attributes && node.attributes.type === "hidden",
    )
    .concat(selectedNodes)
}
