import { ClipboardDocumentIcon, WalletIcon } from "@heroicons/react/24/solid";
import { Button, Card, Col, Loading, Row, Text } from "@nextui-org/react";
import { Icon } from "components/Icon";
import { LightsatsQRCode } from "components/LightsatsQRCode";
import { NextLink } from "components/NextLink";
import copy from "copy-to-clipboard";
import { useTranslation } from "next-i18next";
import React from "react";
import toast from "react-hot-toast";
import { requestProvider } from "webln";

type PayTipInvoiceProps = {
  invoice: string;
};

export function PayTipInvoice({ invoice }: PayTipInvoiceProps) {
  const { t } = useTranslation(["common"]);
  React.useEffect(() => {
    if (invoice) {
      (async () => {
        try {
          console.log("Launching webln");
          const webln = await requestProvider();
          webln.sendPayment(invoice);
        } catch (error) {
          console.error("Failed to load webln", error);
        }
      })();
    }
  }, [invoice]);

  const copyInvoice = React.useCallback(() => {
    copy(invoice);
    toast.success("Copied to clipboard");
  }, [invoice]);

  return (
    <>
      <Card css={{ dropShadow: "$xs" }}>
        <Card.Header>
          <Row>
            <Col span={10}>
              <Text size={20} b>
                💸 Fund this tip
              </Text>
            </Col>

            <Col span={2} style={{ textAlign: "right", alignSelf: "center" }}>
              <Loading color="currentColor" size="sm" />
            </Col>
          </Row>
        </Card.Header>
        <Card.Divider />
        <Card.Body>
          <Row justify="center">
            <NextLink href={`lightning:${invoice}`}>
              <a>
                <LightsatsQRCode value={invoice} />
              </a>
            </NextLink>
          </Row>
        </Card.Body>
        <Card.Divider />
        <Card.Footer>
          <Row justify="space-between">
            <Button color="secondary" auto onClick={copyInvoice}>
              <Icon>
                <ClipboardDocumentIcon />
              </Icon>
              &nbsp;Copy
            </Button>
            <NextLink href={`lightning:${invoice}`}>
              <a>
                <Button auto>
                  <Icon>
                    <WalletIcon />
                  </Icon>
                  &nbsp;{t("common:openInWallet")}
                </Button>
              </a>
            </NextLink>
          </Row>
        </Card.Footer>
      </Card>
    </>
  );
}
