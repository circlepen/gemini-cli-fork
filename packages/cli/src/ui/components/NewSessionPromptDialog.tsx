/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { Box, Text } from 'ink';
import type { RadioSelectItem } from './shared/RadioButtonSelect.js';
import { RadioButtonSelect } from './shared/RadioButtonSelect.js';
import { useKeypress } from '../hooks/useKeypress.js';
import { theme } from '../semantic-colors.js';

export type NewSessionPromptResult = {
  userSelection: 'continue' | 'new_session' | 'compress_session';
};

interface NewSessionPromptDialogProps {
  turnCount: number;
  isYoloMode: boolean;
  onComplete: (result: NewSessionPromptResult) => void;
}

export function NewSessionPromptDialog({
  turnCount,
  isYoloMode,
  onComplete,
}: NewSessionPromptDialogProps) {
  useKeypress(
    (key) => {
      if (key.name === 'escape') {
        onComplete({
          userSelection: 'continue',
        });
      }
    },
    { isActive: true },
  );

  const OPTIONS: Array<RadioSelectItem<NewSessionPromptResult>> = [
    {
      label: 'Continue current session (esc)',
      value: {
        userSelection: 'continue',
      },
      key: 'continue',
    },
    {
      label: 'Start new session',
      value: {
        userSelection: 'new_session',
      },
      key: 'new_session',
    },
    ...(!isYoloMode
      ? [
          {
            label: 'Compress session',
            value: {
              userSelection: 'compress_session',
            } as NewSessionPromptResult,
            key: 'compress_session',
          },
        ]
      : []),
  ];

  return (
    <Box width="100%" flexDirection="row">
      <Box
        flexDirection="column"
        borderStyle="round"
        borderColor={theme.status.warning}
        flexGrow={1}
        marginLeft={1}
      >
        <Box paddingX={1} paddingY={0} flexDirection="column">
          <Box minHeight={1}>
            <Box minWidth={3}>
              <Text color={theme.status.warning} aria-label="Session prompt:">
                ?
              </Text>
            </Box>
            <Box>
              <Text wrap="truncate-end">
                <Text color={theme.text.primary} bold>
                  Session has reached {turnCount} turns
                </Text>{' '}
              </Text>
            </Box>
          </Box>
          <Box marginTop={1}>
            <Box flexDirection="column">
              <Text color={theme.text.secondary}>
                Long sessions may affect performance. Would you like to start a
                new session or continue with the current one?
              </Text>
              <Box marginTop={1}>
                <RadioButtonSelect items={OPTIONS} onSelect={onComplete} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
