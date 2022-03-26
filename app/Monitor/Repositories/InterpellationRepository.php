<?php

namespace App\Monitor\Repositories;

use KubAT\PhpSimple\HtmlDomParser;
use App\{News, Board, Website};
use App\{Interpellation};

class InterpellationRepository
{
    public function downloadInterpellations($url, $element, $recipient)
    {

        $interpellations = HtmlDomParser::file_get_html($url)->find($element);

        $unique_interpellations = array_unique($interpellations);

        $recipient_interpellations = $this->findRecipientInterpellations($unique_interpellations, $recipient);

        $answered_interpellations = $this->findAnsweredInterpellations($recipient_interpellations);

        return $answered_interpellations;
    }

    public function findAnsweredInterpellations($interpellations)
    {
        $ai = [];
        foreach ($interpellations as $interp) {
            $url = "https://www.sejm.gov.pl" . $interp[0]->href;

            $html = HtmlDomParser::file_get_html($url);
            $answer = $html->find('.int-sekcja');

            if ($answer) {
                $ai[] = array(
                    $interp[0]
                );
            }
        }
        return $ai;
    }

    public function findRecipientInterpellations($interpollations, $recipient)
    {
        $rp = [];
        foreach ($interpollations as $inter) {
            $interRecipient = $inter->parent()->prev_sibling()->plaintext;
            // dd($inter);

            if ($interRecipient === $recipient) {
                $rp[] = array(
                    $inter
                );
            }
        }

        return $rp;
    }

    public function findDate($interp)
    {
        $url = "https://www.sejm.gov.pl" . $interp[0]->href;

        $html = HtmlDomParser::file_get_html($url);
        $answer = $html->find('.int-sekcja');

        $answerDate = $answer[0]->next_sibling()->last_child()->last_child()->last_child()->plaintext;

        $datte = implode("-", array_reverse(explode("-", $answerDate)));

        return $datte;
    }

    public function saveInterpellation($int_content, $int_number, $int_url, $int_recipient, $int_type, $int_date, $int_status)
    {
        $interp = Interpellation::create([
            'content' => $int_content,
            'number' => $int_number,
            'url' => $int_url,
            'recipient' => $int_recipient,
            'type' => $int_type,
            'date' => $int_date,
            'status' => $int_status,

        ]);
        return $interp;
    }

    public function readInterpellation($id, $user_id)
    {
        $interp = Interpellation::find($id);
        $interp->status = 'read';
        // $news->user_id = $user_id;
        // $news->updated_at = new \DateTime();
        $interp->save();
        return $interp;
    }
}